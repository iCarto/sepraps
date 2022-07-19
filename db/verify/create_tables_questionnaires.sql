-- Verify sepraps:create_tables_questionnaires on pg
BEGIN;

SELECT
    *
FROM
    "questionnaire"
WHERE
    false;

BEGIN;

SELECT
    *
FROM
    "monthly_questionnaire_instance"
WHERE
    false;

BEGIN;

SELECT
    *
FROM
    "monthly_questionnaire_value"
WHERE
    false;

ROLLBACK;
