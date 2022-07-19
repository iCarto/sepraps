-- Deploy sepraps:update_contacts_relationships to pg
BEGIN;

--
-- Remove field construction_inspector from constructioncontract
--
SET
    CONSTRAINTS "construction_contrac_construction_inspect_cec0a020_fk_contact_i" IMMEDIATE;

ALTER TABLE
    "construction_contract" DROP CONSTRAINT "construction_contrac_construction_inspect_cec0a020_fk_contact_i";

ALTER TABLE
    "construction_contract" DROP COLUMN "construction_inspector_id" CASCADE;

--
-- Remove field construction_supervisor from constructioncontract
--
SET
    CONSTRAINTS "construction_contrac_construction_supervi_d9de0cb4_fk_contact_i" IMMEDIATE;

ALTER TABLE
    "construction_contract" DROP CONSTRAINT "construction_contrac_construction_supervi_d9de0cb4_fk_contact_i";

ALTER TABLE
    "construction_contract" DROP COLUMN "construction_supervisor_id" CASCADE;

--
-- Remove field field_manager from constructioncontract
--
SET
    CONSTRAINTS "construction_contract_field_manager_id_de254bc0_fk_contact_id" IMMEDIATE;

ALTER TABLE
    "construction_contract" DROP CONSTRAINT "construction_contract_field_manager_id_de254bc0_fk_contact_id";

ALTER TABLE
    "construction_contract" DROP COLUMN "field_manager_id" CASCADE;

--
-- Remove field social_coordinator from constructioncontract
--
SET
    CONSTRAINTS "construction_contrac_social_coordinator_i_3af3f68a_fk_contact_i" IMMEDIATE;

ALTER TABLE
    "construction_contract" DROP CONSTRAINT "construction_contrac_social_coordinator_i_3af3f68a_fk_contact_i";

ALTER TABLE
    "construction_contract" DROP COLUMN "social_coordinator_id" CASCADE;

--
-- Remove field social_inspector from constructioncontract
--
SET
    CONSTRAINTS "construction_contrac_social_inspector_id_e21bc955_fk_contact_i" IMMEDIATE;

ALTER TABLE
    "construction_contract" DROP CONSTRAINT "construction_contrac_social_inspector_id_e21bc955_fk_contact_i";

ALTER TABLE
    "construction_contract" DROP COLUMN "social_inspector_id" CASCADE;

--
-- Remove field social_supervisor from constructioncontract
--
SET
    CONSTRAINTS "construction_contrac_social_supervisor_id_b6f8c802_fk_contact_i" IMMEDIATE;

ALTER TABLE
    "construction_contract" DROP CONSTRAINT "construction_contrac_social_supervisor_id_b6f8c802_fk_contact_i";

ALTER TABLE
    "construction_contract" DROP COLUMN "social_supervisor_id" CASCADE;

--
-- Remove field is_staff from contact
--
ALTER TABLE
    "contact" DROP COLUMN "is_staff" CASCADE;

--
-- Add field user to contact
--
ALTER TABLE
    "contact"
ADD
    COLUMN "user_id" bigint NULL CONSTRAINT "contact_user_id_7cc1d233_fk_users_user_id" REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "contact_user_id_7cc1d233_fk_users_user_id" IMMEDIATE;

--
-- Create model ProviderContact
--
CREATE TABLE "provider_contact" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "post" varchar(50) NULL,
    "contact_id" integer NOT NULL,
    "entity_id" integer NOT NULL
);

--
-- Create model ContractorContact
--
CREATE TABLE "contractor_contact" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "post" varchar(50) NULL,
    "contact_id" integer NOT NULL,
    "entity_id" integer NOT NULL
);

--
-- Create model ConstructionContractContact
--
CREATE TABLE "construction_contract_contact" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "post" varchar(50) NULL,
    "contact_id" integer NOT NULL,
    "entity_id" integer NOT NULL
);

--
-- Add field contacts to constructioncontract
--
--
-- Remove field contacts from contractor
--
DROP TABLE "contractor_contacts" CASCADE;

--
-- Add field contacts to contractor
--
--
-- Remove field contacts from provider
--
DROP TABLE "provider_contacts" CASCADE;

--
-- Add field contacts to provider
--
CREATE INDEX "contact_user_id_7cc1d233" ON "contact" ("user_id");

ALTER TABLE
    "provider_contact"
ADD
    CONSTRAINT "provider_contact_contact_id_5f707a88_fk_contact_id" FOREIGN KEY ("contact_id") REFERENCES "contact" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "provider_contact"
ADD
    CONSTRAINT "provider_contact_entity_id_879cd13b_fk_provider_id" FOREIGN KEY ("entity_id") REFERENCES "provider" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "provider_contact_contact_id_5f707a88" ON "provider_contact" ("contact_id");

CREATE INDEX "provider_contact_entity_id_879cd13b" ON "provider_contact" ("entity_id");

ALTER TABLE
    "contractor_contact"
ADD
    CONSTRAINT "contractor_contact_contact_id_36638545_fk_contact_id" FOREIGN KEY ("contact_id") REFERENCES "contact" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "contractor_contact"
ADD
    CONSTRAINT "contractor_contact_entity_id_91216f1c_fk_contractor_id" FOREIGN KEY ("entity_id") REFERENCES "contractor" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "contractor_contact_contact_id_36638545" ON "contractor_contact" ("contact_id");

CREATE INDEX "contractor_contact_entity_id_91216f1c" ON "contractor_contact" ("entity_id");

ALTER TABLE
    "construction_contract_contact"
ADD
    CONSTRAINT "construction_contract_contact_contact_id_95a68e2c_fk_contact_id" FOREIGN KEY ("contact_id") REFERENCES "contact" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "construction_contract_contact"
ADD
    CONSTRAINT "construction_contrac_entity_id_ed113c44_fk_construct" FOREIGN KEY ("entity_id") REFERENCES "construction_contract" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "construction_contract_contact_contact_id_95a68e2c" ON "construction_contract_contact" ("contact_id");

CREATE INDEX "construction_contract_contact_entity_id_ed113c44" ON "construction_contract_contact" ("entity_id");

COMMIT;
