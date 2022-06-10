-- Revert sepraps:update_table_milestone_comments from pg
BEGIN;

ALTER TABLE
    "milestone" DROP COLUMN "comments";

COMMIT;
