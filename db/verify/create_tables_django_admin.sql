-- Verify sepraps:create_tables_django_admin on pg
BEGIN;

SELECT
    *
FROM
    "django_content_type"
WHERE
    false;

SELECT
    *
FROM
    "auth_permission"
WHERE
    false;

SELECT
    *
FROM
    "auth_group"
WHERE
    false;

SELECT
    *
FROM
    "auth_group_permissions"
WHERE
    false;

SELECT
    *
FROM
    "users_user"
WHERE
    false;

SELECT
    *
FROM
    "users_user_groups"
WHERE
    false;

SELECT
    *
FROM
    "users_user_user_permissions"
WHERE
    false;

SELECT
    *
FROM
    "django_admin_log"
WHERE
    false;

SELECT
    *
FROM
    "django_session"
WHERE
    false;

ROLLBACK;
