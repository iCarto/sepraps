-- Revert sepraps:create_tables_questionnaires from pg
BEGIN;

DROP TABLE "monthly_questionnaire_value";

DROP TABLE "monthly_questionnaire_instance";

DROP TABLE "questionnaire";

COMMIT;
