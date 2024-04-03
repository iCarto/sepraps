-- Revert sepraps:create_views_project_progress from pg

BEGIN;

DROP VIEW IF EXISTS project_progress;
DROP VIEW IF EXISTS bcm_progress;

COMMIT;
