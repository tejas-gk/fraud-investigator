from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class Transaction(BaseModel):
    transaction_id: str
    account_id: str
    amount: float = Field(gt=0)
    currency: str = "INR"
    merchant: str | None = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    device_id: str
    ip_address: str
    beneficiary_id: str
    location: str


class FraudDecision(BaseModel):
    transaction_id: str
    case_id: str
    risk_score: int
    risk_level: Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    decision: Literal["ALLOW", "PEND", "REJECT"]
    fraud_type: str
    features: dict[str, float | int | bool | str]
    evidence: list[str]
    graph_signals: list[str]
    recommended_action: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class DemoScenario(BaseModel):
    name: str
    description: str
    transaction: Transaction
