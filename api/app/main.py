from datetime import datetime, timedelta

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import DemoScenario, FraudDecision, Transaction
from .scoring import evaluate_transaction
from .store import CASES

app = FastAPI(title="Fraud Investigator API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/transactions/evaluate", response_model=FraudDecision)
def evaluate(tx: Transaction):
    return evaluate_transaction(tx)


@app.get("/cases", response_model=list[FraudDecision])
def list_cases():
    return CASES[:50]


@app.get("/demo/scenarios", response_model=list[DemoScenario])
def demo_scenarios():
    now = datetime.utcnow()
    return [
        DemoScenario(
            name="Normal transaction",
            description="Known device, known beneficiary, normal amount and location.",
            transaction=Transaction(
                transaction_id="TXN-NORMAL-001",
                account_id="ACC-NORMAL",
                amount=1800,
                device_id="DEVICE-NORMAL",
                ip_address="49.37.22.10",
                beneficiary_id="BEN-NORMAL",
                location="Bengaluru",
                timestamp=now,
            ),
        ),
        DemoScenario(
            name="Account takeover",
            description="Large payment from a new device, new beneficiary and unusual city.",
            transaction=Transaction(
                transaction_id="TXN-ATO-001",
                account_id="ACC-9281",
                amount=85000,
                device_id="DEVICE-NEW-881",
                ip_address="103.21.244.8",
                beneficiary_id="BEN-774",
                location="Delhi",
                timestamp=now.replace(hour=2, minute=14),
            ),
        ),
        DemoScenario(
            name="Fraud ring",
            description="Shared device, IP and beneficiary connect multiple accounts.",
            transaction=Transaction(
                transaction_id="TXN-RING-001",
                account_id="ACC-RING-1",
                amount=42000,
                device_id="DEVICE-RING",
                ip_address="10.10.10.99",
                beneficiary_id="BEN-RING",
                location="Mumbai",
                timestamp=now,
            ),
        ),
        DemoScenario(
            name="Potential false positive",
            description="High-value payment but otherwise familiar behavior; analyst review is appropriate.",
            transaction=Transaction(
                transaction_id="TXN-FP-001",
                account_id="ACC-NORMAL",
                amount=12000,
                device_id="DEVICE-NORMAL",
                ip_address="49.37.22.10",
                beneficiary_id="BEN-NORMAL",
                location="Bengaluru",
                timestamp=now,
            ),
        ),
        DemoScenario(
            name="Velocity burst",
            description="Use this transaction repeatedly to simulate card testing or automated abuse.",
            transaction=Transaction(
                transaction_id="TXN-VEL-001",
                account_id="ACC-VELOCITY",
                amount=20,
                device_id="DEVICE-VEL",
                ip_address="45.8.8.8",
                beneficiary_id="BEN-VEL",
                location="Pune",
                timestamp=now - timedelta(minutes=1),
            ),
        ),
    ]
