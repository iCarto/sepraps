-- Revert sepraps:create_relationship_project_questionnaire from pg
BEGIN;

DELETE FROM
    auth_permission
WHERE
    content_type_id IN (
        SELECT
            content_type_id
        FROM
            django_content_type
        WHERE
            app_label = 'monitoring'
            AND model = 'projectquestionnaireinstance'
    );

DELETE FROM
    django_content_type
WHERE
    app_label = 'monitoring'
    AND model = 'projectquestionnaireinstance';

DROP TABLE "project_questionnaires";

DROP TABLE "project_questionnaire_instance";

COMMIT;
