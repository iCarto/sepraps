-- Revert sepraps:create_table_log_request from pg
BEGIN;

DROP TABLE "log_request";

COMMIT;
