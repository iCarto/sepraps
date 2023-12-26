-- Revert sepraps:create_table_connection from pg

BEGIN;

--
-- Delete model Connection
--
DROP TABLE "connection_comments" CASCADE;
DROP TABLE "connection" CASCADE;

DELETE FROM public.media_node WHERE storage_path like '%connection%';

COMMIT;
