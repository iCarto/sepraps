-- Revert sepraps:create_tables_sepraps from pg
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
                app_label = 'documents'
                AND model = 'medianode'
            )
            OR (
                app_label = 'documents'
                AND model = 'document'
            )
            OR (
                app_label = 'documents'
                AND model = 'folder'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'domainentry'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'department'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'milestone'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'locality'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'financingprogram'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'project'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'contact'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'provider'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'financingfund'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'infrastructure'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'district'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'constructioncontract'
            )
            OR (
                app_label = 'monitoring'
                AND model = 'contractor'
            )
    );

DELETE FROM
    django_content_type
WHERE
    (
        app_label = 'documents'
        AND model = 'medianode'
    )
    OR (
        app_label = 'documents'
        AND model = 'document'
    )
    OR (
        app_label = 'documents'
        AND model = 'folder'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'domainentry'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'department'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'milestone'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'locality'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'financingprogram'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'project'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'contact'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'provider'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'financingfund'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'infrastructure'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'district'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'constructioncontract'
    )
    OR (
        app_label = 'monitoring'
        AND model = 'contractor'
    );

DROP TABLE "contractor_contacts";

DROP TABLE "milestone";

DROP TABLE "project_linked_localities";

DROP TABLE "project";

DROP TABLE "provider_contacts";

DROP TABLE "provider";

DROP TABLE "infrastructure";

DROP TABLE "financing_program";

DROP TABLE "financing_fund";

DROP TABLE "construction_contract";

DROP TABLE "contractor";

DROP TABLE "contact";

DROP TABLE "locality";

DROP TABLE "district";

DROP TABLE "department";

DROP TABLE "media_node";

DROP TABLE "dominios";

COMMIT;
