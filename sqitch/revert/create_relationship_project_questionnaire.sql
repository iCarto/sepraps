-- Revert sepraps:create_relationship_project_questionnaire from pg
BEGIN;

DROP TABLE "project_questionnaires";

DROP TABLE "project_questionnaire_instance";

COMMIT;
