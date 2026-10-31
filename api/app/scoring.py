from datetime import timedelta

from .models import FraudDecision, Transaction
from .store import ACCOUNT_PROFILES, CASES, ENTITY_LINKS, TRANSACTION_HISTORY


def _profile_for(tx: Transaction) -> dict:
    return ACCOUNT_PROFILES.get(
        tx.account_id,
        {
            "avg_amount": 5000,
            "known_devices": set(),
            "known_beneficiaries": set(),
            "usual_locations": set(),
        },
    )


def extract_features(tx: Transaction) -> dict:
    profile = _profile_for(tx)
    recent = [
        item
        for item in TRANSACTION_HISTORY[tx.account_id]
        if tx.timestamp - item.timestamp <= timedelta(minutes=10)
    ]
    avg_amount = max(float(profile["avg_amount"]), 1.0)
    amount_ratio = round(tx.amount / avg_amount, 2)
    return {
        "amount": tx.amount,
        "average_amount": avg_amount,
        "amount_vs_average": amount_ratio,
        "transactions_last_10m": len(recent) + 1,
        "new_device": tx.device_id not in profile["known_devices"],
        "new_beneficiary": tx.beneficiary_id not in profile["known_beneficiaries"],
        "unusual_location": tx.location not in profile["usual_locations"],
        "night_transaction": tx.timestamp.hour < 5,
    }


def graph_analysis(tx: Transaction) -> tuple[int, list[str]]:
    score = 0
    signals: list[str] = []
    for entity, label in [
        (tx.device_id, "device"),
        (tx.ip_address, "IP address"),
        (tx.beneficiary_id, "beneficiary"),
    ]:
        link = ENTITY_LINKS.get(entity)
        if not link:
            continue
        linked_accounts = link.get("accounts", set())
        if len(linked_accounts) >= 3:
            score += 20
            signals.append(
                f"Shared {label} is linked to {len(linked_accounts)} accounts"
            )
        if link.get("flagged"):
            score += 25
            signals.append(f"{label.title()} is present in the flagged-entity graph")
    return min(score, 50), signals


def evaluate_transaction(tx: Transaction) -> FraudDecision:
    features = extract_features(tx)
    score = 0
    evidence: list[str] = []

    if features["amount_vs_average"] >= 10:
        score += 30
        evidence.append(
            f"Transaction amount is {features['amount_vs_average']}x the account baseline"
        )
    elif features["amount_vs_average"] >= 4:
        score += 18
        evidence.append("Transaction amount is substantially above the account baseline")

    if features["new_device"]:
        score += 18
        evidence.append("New device")
    if features["new_beneficiary"]:
        score += 15
        evidence.append("New beneficiary")
    if features["unusual_location"]:
        score += 12
        evidence.append("Unusual geographic location")
    if features["night_transaction"]:
        score += 5
        evidence.append("Transaction occurred during an unusual hour")
    if features["transactions_last_10m"] >= 10:
        score += 30
        evidence.append(
            f"High velocity: {features['transactions_last_10m']} transactions in 10 minutes"
        )
    elif features["transactions_last_10m"] >= 5:
        score += 18
        evidence.append("Elevated transaction velocity")

    graph_score, graph_signals = graph_analysis(tx)
    score = min(score + graph_score, 100)

    if score >= 90:
        level, decision = "CRITICAL", "REJECT"
    elif score >= 70:
        level, decision = "HIGH", "PEND"
    elif score >= 40:
        level, decision = "MEDIUM", "PEND"
    else:
        level, decision = "LOW", "ALLOW"

    if graph_score >= 40:
        fraud_type = "POSSIBLE_FRAUD_RING"
    elif features["transactions_last_10m"] >= 10:
        fraud_type = "POSSIBLE_CARD_TESTING_OR_VELOCITY_ABUSE"
    elif features["new_device"] and features["new_beneficiary"]:
        fraud_type = "POSSIBLE_ACCOUNT_TAKEOVER"
    elif score >= 40:
        fraud_type = "ANOMALOUS_TRANSACTION"
    else:
        fraud_type = "NO_MATERIAL_FRAUD_SIGNAL"

    action = {
        "ALLOW": "Allow transaction and continue monitoring",
        "PEND": "Hold transaction and request step-up verification or analyst review",
        "REJECT": "Block transaction and open an investigation case",
    }[decision]

    decision_obj = FraudDecision(
        transaction_id=tx.transaction_id,
        case_id=f"CASE-{len(CASES) + 1:05d}",
        risk_score=score,
        risk_level=level,
        decision=decision,
        fraud_type=fraud_type,
        features=features,
        evidence=evidence,
        graph_signals=graph_signals,
        recommended_action=action,
    )

    TRANSACTION_HISTORY[tx.account_id].append(tx)
    CASES.insert(0, decision_obj)
    return decision_obj
