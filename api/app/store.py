from collections import defaultdict


ACCOUNT_PROFILES = {
    "ACC-9281": {
        "avg_amount": 4600,
        "known_devices": {"DEVICE-123"},
        "known_beneficiaries": {"BEN-100", "BEN-101"},
        "usual_locations": {"Bengaluru"},
    },
    "ACC-NORMAL": {
        "avg_amount": 2200,
        "known_devices": {"DEVICE-NORMAL"},
        "known_beneficiaries": {"BEN-NORMAL"},
        "usual_locations": {"Bengaluru"},
    },
    "ACC-RING-1": {
        "avg_amount": 3000,
        "known_devices": {"DEVICE-RING"},
        "known_beneficiaries": {"BEN-RING"},
        "usual_locations": {"Mumbai"},
    },
}

TRANSACTION_HISTORY = defaultdict(list)

# Shared-entity graph used by the prototype to demonstrate fraud-ring signals.
ENTITY_LINKS = {
    "DEVICE-RING": {"accounts": {"ACC-RING-1", "ACC-RING-2", "ACC-RING-3"}},
    "10.10.10.99": {"accounts": {"ACC-RING-1", "ACC-RING-2", "ACC-RING-3", "ACC-RING-4"}},
    "BEN-RING": {"accounts": {"ACC-RING-1", "ACC-RING-2", "ACC-RING-4"}, "flagged": True},
    "BEN-774": {"accounts": {"ACC-777", "ACC-778", "ACC-779", "ACC-780"}, "flagged": True},
}

CASES = []
