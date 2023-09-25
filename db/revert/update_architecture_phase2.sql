-- Revert sepraps:update_architecture_phase2 from pg

BEGIN;

UPDATE django_content_type SET app_label = 'monitoring' WHERE app_label = 'app';

COMMIT;
