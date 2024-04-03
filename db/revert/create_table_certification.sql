-- Revert sepraps:create_table_certification from pg

BEGIN;

DROP TABLE "certification_comments" CASCADE;
DROP TABLE "certification" CASCADE;

COMMIT;
