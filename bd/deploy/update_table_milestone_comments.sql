-- Deploy sepraps:update_table_milestone_comments to pg
BEGIN;

--
-- Add field comments to milestone
--
ALTER TABLE
    "milestone"
ADD
    COLUMN "comments" text NULL;

COMMIT;
