-- Revert sepraps:update_table_project_image from pg
BEGIN;

ALTER TABLE
    "project" DROP COLUMN "featured_image_id";

COMMIT;
