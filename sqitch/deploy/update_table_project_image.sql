-- Deploy sepraps:update_table_project_image to pg
BEGIN;

--
-- Add field featured_image to project
--
ALTER TABLE
    "project"
ADD
    COLUMN "featured_image_id" integer NULL CONSTRAINT "project_featured_image_id_c751233d_fk_media_node_id" REFERENCES "media_node"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "project_featured_image_id_c751233d_fk_media_node_id" IMMEDIATE;

--
-- Alter field folder on project
--
CREATE INDEX "project_featured_image_id_c751233d" ON "project" ("featured_image_id");

COMMIT;
