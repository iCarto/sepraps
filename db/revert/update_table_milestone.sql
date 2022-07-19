-- Revert sepraps:update_table_milestone from pg
BEGIN;

--
-- Add field checklist to milestone
--
ALTER TABLE
    "milestone"
ADD
    COLUMN "category" varchar(50) DEFAULT '' NOT NULL;

ALTER TABLE
    "milestone"
ALTER COLUMN
    "category" DROP DEFAULT;

ALTER TABLE
    "milestone" DROP COLUMN "code" CASCADE;

ALTER TABLE
    "milestone" DROP COLUMN "name" CASCADE;

ALTER TABLE
    "milestone" DROP COLUMN "short_name" CASCADE;

ALTER TABLE
    "milestone" DROP COLUMN "checklist" CASCADE;

COMMIT;
