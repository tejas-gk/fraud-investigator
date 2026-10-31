# azentio.ai Hackathon Build Requirements — implementation map

Source: `SpecialChallengeDoc.pdf`, v1.0, 29 October 2026.

## Product goal
Build azentio.ai as an enterprise AI website plus secure collaboration portal for public visitors, employees, clients, moderators, product owners/publishers and portal administrators.

## Implemented in the current dummy-backend prototype
- Azentio banking-focused public landing experience.
- Banking catalogue: core banking, digital, lending, risk & compliance, trade/treasury, collective intelligence.
- Role-preview switcher for Public, Employee, Client and Moderator experiences.
- Employee experiment cards and synthetic sandbox framing.
- Client workspace/entitlement preview.
- Collective-learning approved feed with synthetic multi-organisation evidence.
- Observation capture with explicit visibility choice: private, organisation, proposed community sharing.
- Moderator review/publish preview.
- AIRA-style AI-assisted synthesis with evidence count, limitations and explicit synthetic-data labelling.
- Improvement-idea statuses in employee experiments.
- Responsive Azentio-inspired visual system.

## Required production architecture (next backend phase)
### Identity and access
Server-side RBAC + tenant membership + audience + product entitlement checks. Deny by default. Never trust a localStorage role, email suffix alone, navigation visibility or user-provided tenant ID.

Suggested roles/grants:
- public
- employee
- client_member
- client_admin
- learning_moderator
- content_publisher
- portal_admin
- product_owner (assignment-scoped)

### Authentication
- Employee: Entra ID/OIDC where available; otherwise managed email-code/magic-link with approved provisioning.
- Client: single-use expiring invitation tied to organisation + proposed role.
- Explicit active workspace for multi-membership users.

### Core entities
`User`, `Organisation`, `Membership`, `RoleGrant`, `Entitlement`, `ResourceAudience`, `Invitation`, `Observation`, `ObservationVersion`, `SharedContribution`, `ModerationDecision`, `ConsentRecord`, `Theme`, `ImprovementIdea`, `Notification`, `AuditEvent`, `SandboxRun`, `MediaResource`.

### Observation lifecycle
`DRAFT -> SUBMITTED -> RETURNED | REJECTED | APPROVED -> PUBLISHED -> WITHDRAWN`

Keep private source and approved shared representation separate. Material edits to published content create a new version and renewed review.

### Consent dimensions
Record separately:
1. storage/processing,
2. publishing reviewed shared representation,
3. author/organisation attribution,
4. future model training/federated learning.

### Shared-learning safeguards
- De-identify by default.
- Exclude tenant IDs, private profiles, original attachments and reviewer notes from shared payloads.
- Suppress small cohorts; judging threshold: at least 3 distinct synthetic organisations.
- Search/count/export must enforce the same visibility policy as the records.
- Withdrawal must invalidate future search/index/cache/AIRA retrieval within the judging target (synchronous or <=60 seconds).

### Employee experience
Dashboard, internal Playground, internal Live, experiments, assigned improvement ideas, hackathon team spaces, release notes, internal knowledge library. Employee-only content must never enter client/public search or AIRA retrieval.

### Client experience
Organisation workspace, entitlements, isolated sandbox runs, sessions, observations, shared learning, improvement status, saved searches, bookmarks, notifications and client administration constrained to own tenant.

### AIRA / insight service
Retrieval only over content permitted for the active identity/workspace. Cite approved contributions. Preserve uncertainty and evidence links. Retrieval/summarisation is not model retraining.

### Audit and notifications
Audit role/permission changes, moderation transitions, publication/withdrawal, idea status changes and privileged operations. Use persisted in-app notifications/outbox; do not label queued email as delivered.

## Optional P2: genuine federated learning
Use 3+ isolated synthetic client datasets, local training, governed model-update aggregation, separate holdout evaluation, participant/update/model lineage, dropout scenario, validation and human deployment approval. Do not claim formal secure aggregation/privacy guarantees unless actually implemented and measured.

## Demo principle
All banking workflows in this hackathon should use synthetic data or explicitly approved sandbox data. The catalogue may represent real Azentio product areas, but the prototype must not imply that simulated AI output is an approved credit, compliance or business decision.
