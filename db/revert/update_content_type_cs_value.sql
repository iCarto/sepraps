-- Revert sepraps:update_content_type_cs_value from pg

BEGIN;

DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_contractservicevalue');
DELETE FROM auth_permission WHERE codename like '%_contractservicevalue';

DELETE FROM django_content_type where app_label = 'app' and model in ('contractservicevalue');

COMMIT;
