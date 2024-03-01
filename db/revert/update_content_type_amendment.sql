-- Revert sepraps:update_content_type_amendment from pg

BEGIN;


DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_amendment');
DELETE FROM auth_permission WHERE codename like '%_amendment';

DELETE FROM django_content_type where app_label = 'app' and model in ('amendment');


COMMIT;
