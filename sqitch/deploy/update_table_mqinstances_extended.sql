-- Deploy sepraps:update_table_mqvalue_instances to pg
BEGIN;

--
-- Add field extended to monthlyquestionnaireinstance
--
ALTER TABLE
    "monthly_questionnaire_instance"
ADD
    COLUMN "extended" boolean DEFAULT false NOT NULL;

ALTER TABLE
    "monthly_questionnaire_instance"
ALTER COLUMN
    "extended" DROP DEFAULT;

COMMIT;
