# Fraud Investigator

End-to-end fraud detection and investigation prototype for hackathon demos.

## What it does

- Accepts incoming payment transactions
- Engineers behavioral risk features
- Runs deterministic fraud rules
- Produces a combined risk score and ALLOW / PEND / REJECT decision
- Detects simple fraud-ring signals from shared device / IP / beneficiary relationships
- Creates investigation cases with evidence and recommended actions
- Exposes a FastAPI backend and a lightweight Next.js analyst dashboard
- Includes seeded demo scenarios and Docker Compose

## Architecture

```text
Incoming transaction
      |
      v
Feature engineering
      |
      +--> Rule engine
      |
      +--> Behavioral scorer
      |
      +--> Graph/ring analysis
      |
      v
Combined risk score
      |
      v
Investigation case
      |
      v
Analyst dashboard
```

## Quick start

```bash
docker compose up --build
```

Then open:

- API docs: http://localhost:8000/docs
- Dashboard: http://localhost:3000

## Example API request

```bash
curl -X POST http://localhost:8000/transactions/evaluate \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_id": "TXN-ATO-001",
    "account_id": "ACC-9281",
    "amount": 85000,
    "currency": "INR",
    "merchant": "Amazon",
    "device_id": "DEVICE-NEW-881",
    "ip_address": "103.21.244.8",
    "beneficiary_id": "BEN-774",
    "location": "Delhi"
  }'
```

Expected shape:

```json
{
  "transaction_id": "TXN-ATO-001",
  "risk_score": 94,
  "risk_level": "CRITICAL",
  "decision": "PEND",
  "fraud_type": "POSSIBLE_ACCOUNT_TAKEOVER",
  "evidence": [
    "New device",
    "Transaction amount is far above the account baseline",
    "New beneficiary",
    "Unusual location"
  ],
  "recommended_action": "Hold transaction and request step-up verification"
}
```

## Demo scenarios

The API exposes `GET /demo/scenarios` with examples for:

1. Normal transaction
2. Account takeover
3. Fraud ring
4. Potential false positive
5. Card-testing / velocity burst

## Project structure

```text
api/
  app/
    main.py
    models.py
    scoring.py
    store.py
web/
  app/
    page.tsx
  package.json
docker-compose.yml
```

## Notes

This is a hackathon prototype demonstrating fraud analytics and governance-oriented investigation output. It is not a production banking decision engine and does not claim regulatory certification.
