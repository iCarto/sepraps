-- Verify sepraps:create_tables_phase2 on pg

BEGIN;

SELECT
    *
FROM
    "field_report"
WHERE
    false;

SELECT
    *
FROM
    "field_report_project"
WHERE
    false;

SELECT
    *
FROM
    "field_report_project_activity"
WHERE
    false;

ROLLBACK;
