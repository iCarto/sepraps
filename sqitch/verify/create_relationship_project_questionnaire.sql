-- Verify sepraps:create_relationship_project_questionnaire on pg
BEGIN;

SELECT
    *
FROM
    "project_questionnaires"
WHERE
    false;

BEGIN;

SELECT
    *
FROM
    "project_questionnaire_instance"
WHERE
    false;

ROLLBACK;
