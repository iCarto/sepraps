-- Verify sepraps:create_tables_payments on pg

BEGIN;

SELECT
    *
FROM
    "payment_comments"
WHERE
    false;

SELECT
    *
FROM
    "comment"
WHERE
    false;

SELECT
    *
FROM
    "payment"
WHERE
    false;

SELECT
    *
FROM
    "product"
WHERE
    false;

SELECT
    awarding_budget_min,
    bid_request_budget_min,
    payment_criteria_type,
    payment_frequency_type,
    total_amount_type
FROM
    "construction_contract"
WHERE
    false;

SELECT
    active
FROM
    "field_report"
WHERE
    false;

SELECT
    active
FROM
    "field_report_project"
WHERE
    false;

SELECT
    active
FROM
    "field_report_project_activity"
WHERE
    false;

SELECT
    active
FROM
    "provider"
WHERE
    false;

ROLLBACK;
