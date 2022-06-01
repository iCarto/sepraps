-- Deploy sepraps:insert_records_profiles to pg
BEGIN;

INSERT INTO
    auth_group ("name")
VALUES
    ('edicion'),
    ('gestion'),
    ('visualizacion'),
    ('supervision');

-- Groups for admin user
INSERT INTO
    users_user_groups (user_id, group_id)
SELECT
    u.id,
    g.id
FROM
    auth_group g
    LEFT JOIN users_user u ON u.username = 'admin'
WHERE
    g."name" IN (
        'edicion',
        'gestion',
        'visualizacion',
        'supervision'
    )
    AND u.id IS NOT NULL;

-- Helpful script for generating insert into sentences based on current configuration
-- SELECT 'INSERT INTO auth_group_permissions (group_id, permission_id) SELECT g.id, p.id FROM auth_group g INNER join auth_group_permissions gp ON gp.group_id = g.id AND g."name" = ''' || g.name || ''' INNER join auth_permission p ON gp.permission_id = p.id AND p.codename = ''' || p.codename || ''';'
--	FROM auth_group g
--	LEFT JOIN auth_group_permissions gp on gp.group_id = g.id
--	LEFT JOIN auth_permission p on gp.permission_id = p.id;
INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_folder';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_folder';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_folder';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_folder';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_questionnaire';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_domainentry';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_department';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingprogram';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_locality';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_locality';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_milestone';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_milestone';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_district';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'edicion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingfund';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_folder';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_questionnaire';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_domainentry';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_department';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingprogram';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_locality';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_locality';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_milestone';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_milestone';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_district';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'gestion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingfund';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_folder';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_questionnaire';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_domainentry';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_department';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingprogram';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_locality';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_milestone';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_district';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'visualizacion'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingfund';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_medianode';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_document';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_folder';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_monthlyquestionnairevalue';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_questionnaire';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_domainentry';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contact';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_constructioncontract';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_provider';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_department';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingprogram';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_locality';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_infrastructure';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_contractor';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_milestone';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_milestone';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_projectquestionnaireinstance';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_district';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'add_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'change_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'delete_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_project';

INSERT INTO
    auth_group_permissions (group_id, permission_id)
SELECT
    g.id,
    p.id
FROM
    auth_group g
    INNER join auth_group_permissions gp ON gp.group_id = g.id
    AND g."name" = 'supervision'
    INNER join auth_permission p ON gp.permission_id = p.id
    AND p.codename = 'view_financingfund';

COMMIT;
