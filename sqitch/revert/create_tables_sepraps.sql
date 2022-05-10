-- Revert sepraps:create_tables_sepraps from pg
BEGIN;

DROP TABLE "contractor_contacts";

DROP TABLE "contractor";

DROP TABLE "milestone";

DROP TABLE "media_node";

DROP TABLE "project_linked_localities";

DROP TABLE "project";

DROP TABLE "provider_contacts";

DROP TABLE "provider";

DROP TABLE "locality";

DROP TABLE "infrastructure";

DROP TABLE "financing_program";

DROP TABLE "financing_fund";

DROP TABLE "dominios";

DROP TABLE "district";

DROP TABLE "department";

DROP TABLE "contact";

DROP TABLE "construction_contract";

COMMIT;
