-- Verify sepraps:update_contacts_relationships on pg
BEGIN;

SELECT
    *
FROM
    "construction_contract_contact"
WHERE
    false;

SELECT
    *
FROM
    "contractor_contact"
WHERE
    false;

SELECT
    *
FROM
    "provider_contact"
WHERE
    false;

ROLLBACK;
