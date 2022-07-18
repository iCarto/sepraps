-- Verify sepraps:update_table_milestone_comments on pg
BEGIN;

SELECT
    comments
FROM
    "milestone"
WHERE
    false;

ROLLBACK;
