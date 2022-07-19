-- Verify sepraps:create_table_log_request on pg
BEGIN;

SELECT
    *
FROM
    "log_request"
WHERE
    false;

ROLLBACK;
