-- Revert sepraps:insert_records_profiles from pg
BEGIN;

DELETE FROM
    users_user_groups;

DELETE FROM
    auth_group_permissions;

DELETE FROM
    auth_group;

COMMIT;
