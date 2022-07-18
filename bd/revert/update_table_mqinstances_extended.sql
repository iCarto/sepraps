-- Revert sepraps:update_table_mqvalue_instances from pg
BEGIN;

ALTER TABLE
    "monthly_questionnaire_instance" DROP COLUMN "extended";

COMMIT;
