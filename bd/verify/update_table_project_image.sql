-- Verify sepraps:update_table_project_image on pg
BEGIN;

SELECT
    featured_image_id
FROM
    "project"
WHERE
    false;

ROLLBACK;
