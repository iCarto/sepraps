-- Deploy sepraps:update_table_milestone to pg
BEGIN;

--
-- Add field checklist to milestone
--
ALTER TABLE
    "milestone"
ADD
    COLUMN "checklist" jsonb NULL;

--
-- Add field code to milestone
--
ALTER TABLE
    "milestone"
ADD
    COLUMN "code" varchar(50) DEFAULT '' NOT NULL;

ALTER TABLE
    "milestone"
ALTER COLUMN
    "code" DROP DEFAULT;

--
-- Add field name to milestone
--
ALTER TABLE
    "milestone"
ADD
    COLUMN "name" varchar(100) DEFAULT '' NOT NULL;

ALTER TABLE
    "milestone"
ALTER COLUMN
    "name" DROP DEFAULT;

--
-- Add field short_name to milestone
--
ALTER TABLE
    "milestone"
ADD
    COLUMN "short_name" varchar(100) DEFAULT '' NOT NULL;

ALTER TABLE
    "milestone"
ALTER COLUMN
    "short_name" DROP DEFAULT;

--
-- Remove field category from milestone
--
ALTER TABLE
    "milestone" DROP COLUMN "category" CASCADE;

COMMIT;
