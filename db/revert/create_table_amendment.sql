-- Revert sepraps:create_table_amendment from pg

BEGIN;

--
-- Delete model Amendment
--
DROP TABLE "amendment" CASCADE;

COMMIT;
