-- Revert sepraps:create_tables_questionnaires from pg
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
            (
                app_label = 'questionnaires'
                AND model = 'monthlyquestionnairevalue'
            )
            OR (
                app_label = 'questionnaires'
                AND model = 'questionnaire'
            )
            OR (
                app_label = 'questionnaires'
                AND model = 'monthlyquestionnaireinstance'
            )
    );

DELETE FROM
    django_content_type
WHERE
    (
        app_label = 'questionnaires'
        AND model = 'monthlyquestionnairevalue'
    )
    OR (
        app_label = 'questionnaires'
        AND model = 'questionnaire'
    )
    OR (
        app_label = 'questionnaires'
        AND model = 'monthlyquestionnaireinstance'
    );

DROP TABLE "monthly_questionnaire_value";

DROP TABLE "monthly_questionnaire_instance";

DROP TABLE "questionnaire";

COMMIT;
