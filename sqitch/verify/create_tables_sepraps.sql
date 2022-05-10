-- Verify sepraps:create_tables_sepraps on pg
BEGIN;

SELECT
    *
FROM
    "construction_contract"
WHERE
    false;

SELECT
    *
FROM
    "contact"
WHERE
    false;

SELECT
    *
FROM
    "department"
WHERE
    false;

SELECT
    *
FROM
    "district"
WHERE
    false;

SELECT
    *
FROM
    "dominios"
WHERE
    false;

SELECT
    *
FROM
    "financing_fund"
WHERE
    false;

SELECT
    *
FROM
    "financing_program"
WHERE
    false;

SELECT
    *
FROM
    "infrastructure"
WHERE
    false;

SELECT
    *
FROM
    "locality"
WHERE
    false;

SELECT
    *
FROM
    "provider"
WHERE
    false;

SELECT
    *
FROM
    "provider_contacts"
WHERE
    false;

SELECT
    *
FROM
    "project"
WHERE
    false;

SELECT
    *
FROM
    "project_linked_localities"
WHERE
    false;

SELECT
    *
FROM
    "media_node"
WHERE
    false;

SELECT
    *
FROM
    "milestone"
WHERE
    false;

SELECT
    *
FROM
    "contractor"
WHERE
    false;

SELECT
    *
FROM
    "contractor_contacts"
WHERE
    false;

ROLLBACK;
