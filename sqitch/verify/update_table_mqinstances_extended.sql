-- Verify sepraps:update_table_mqvalue_instances on pg
BEGIN;

SELECT
    extended
FROM
    "monthly_questionnaire_instance"
WHERE
    false;

ROLLBACK;
