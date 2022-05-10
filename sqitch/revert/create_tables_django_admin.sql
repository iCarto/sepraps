-- Revert sepraps:create_tables_django_admin from pg
BEGIN;

DROP TABLE "django_session";

DROP TABLE "django_admin_log";

DROP TABLE "users_user_user_permissions";

DROP TABLE "users_user_groups";

DROP TABLE "users_user";

DROP TABLE "auth_group_permissions";

DROP TABLE "auth_group";

DROP TABLE "auth_permission";

DROP TABLE "django_content_type";

COMMIT;
