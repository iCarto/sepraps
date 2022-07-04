-- Revert sepraps:update_contacts_relationships from pg
BEGIN;

--
-- Remove field contact from contractorcontact
--
ALTER TABLE
    "contractor_contact" DROP COLUMN "contact_id" CASCADE;

--
-- Remove field entity from contractorcontact
--
ALTER TABLE
    "contractor_contact" DROP COLUMN "entity_id" CASCADE;

--
-- Remove field contact from providercontact
--
ALTER TABLE
    "provider_contact" DROP COLUMN "contact_id" CASCADE;

--
-- Remove field entity from providercontact
--
ALTER TABLE
    "provider_contact" DROP COLUMN "entity_id" CASCADE;

--
-- Remove field contacts from constructioncontract
--
--
-- Remove field user from contact
--
ALTER TABLE
    "contact" DROP COLUMN "user_id" CASCADE;

--
-- Add field construction_inspector to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "construction_inspector_id" integer NULL CONSTRAINT "construction_contrac_construction_inspect_cec0a020_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_construction_inspect_cec0a020_fk_contact_i" IMMEDIATE;

--
-- Add field construction_supervisor to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "construction_supervisor_id" integer NULL CONSTRAINT "construction_contrac_construction_supervi_d9de0cb4_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_construction_supervi_d9de0cb4_fk_contact_i" IMMEDIATE;

--
-- Add field field_manager to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "field_manager_id" integer NULL CONSTRAINT "construction_contract_field_manager_id_de254bc0_fk_contact_id" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contract_field_manager_id_de254bc0_fk_contact_id" IMMEDIATE;

--
-- Add field social_coordinator to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "social_coordinator_id" integer NULL CONSTRAINT "construction_contrac_social_coordinator_i_3af3f68a_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_social_coordinator_i_3af3f68a_fk_contact_i" IMMEDIATE;

--
-- Add field social_inspector to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "social_inspector_id" integer NULL CONSTRAINT "construction_contrac_social_inspector_id_e21bc955_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_social_inspector_id_e21bc955_fk_contact_i" IMMEDIATE;

--
-- Add field social_supervisor to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "social_supervisor_id" integer NULL CONSTRAINT "construction_contrac_social_supervisor_id_b6f8c802_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_social_supervisor_id_b6f8c802_fk_contact_i" IMMEDIATE;

--
-- Add field is_staff to contact
--
ALTER TABLE
    "contact"
ADD
    COLUMN "is_staff" boolean DEFAULT false NOT NULL;

ALTER TABLE
    "contact"
ALTER COLUMN
    "is_staff" DROP DEFAULT;

--
-- Remove field contacts from contractor
--
--
-- Add field contacts to contractor
--
CREATE TABLE "contractor_contacts" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "contractor_id" integer NOT NULL,
    "contact_id" integer NOT NULL
);

--
-- Remove field contacts from provider
--
--
-- Add field contacts to provider
--
CREATE TABLE "provider_contacts" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "provider_id" integer NOT NULL,
    "contact_id" integer NOT NULL
);

--
-- Delete model ConstructionContractContact
--
DROP TABLE "construction_contract_contact" CASCADE;

--
-- Delete model ContractorContact
--
DROP TABLE "contractor_contact" CASCADE;

--
-- Delete model ProviderContact
--
DROP TABLE "provider_contact" CASCADE;

CREATE INDEX "construction_contract_construction_inspector_id_cec0a020" ON "construction_contract" ("construction_inspector_id");

CREATE INDEX "construction_contract_construction_supervisor_id_d9de0cb4" ON "construction_contract" ("construction_supervisor_id");

CREATE INDEX "construction_contract_field_manager_id_de254bc0" ON "construction_contract" ("field_manager_id");

CREATE INDEX "construction_contract_social_coordinator_id_3af3f68a" ON "construction_contract" ("social_coordinator_id");

CREATE INDEX "construction_contract_social_inspector_id_e21bc955" ON "construction_contract" ("social_inspector_id");

CREATE INDEX "construction_contract_social_supervisor_id_b6f8c802" ON "construction_contract" ("social_supervisor_id");

ALTER TABLE
    "contractor_contacts"
ADD
    CONSTRAINT "contractor_contacts_contractor_id_contact_id_27f90927_uniq" UNIQUE ("contractor_id", "contact_id");

ALTER TABLE
    "contractor_contacts"
ADD
    CONSTRAINT "contractor_contacts_contractor_id_7630c780_fk_contractor_id" FOREIGN KEY ("contractor_id") REFERENCES "contractor" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "contractor_contacts"
ADD
    CONSTRAINT "contractor_contacts_contact_id_4247036d_fk_contact_id" FOREIGN KEY ("contact_id") REFERENCES "contact" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "contractor_contacts_contractor_id_7630c780" ON "contractor_contacts" ("contractor_id");

CREATE INDEX "contractor_contacts_contact_id_4247036d" ON "contractor_contacts" ("contact_id");

ALTER TABLE
    "provider_contacts"
ADD
    CONSTRAINT "provider_contacts_provider_id_contact_id_0aab376f_uniq" UNIQUE ("provider_id", "contact_id");

ALTER TABLE
    "provider_contacts"
ADD
    CONSTRAINT "provider_contacts_provider_id_48bddef8_fk_provider_id" FOREIGN KEY ("provider_id") REFERENCES "provider" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "provider_contacts"
ADD
    CONSTRAINT "provider_contacts_contact_id_5b9ec26d_fk_contact_id" FOREIGN KEY ("contact_id") REFERENCES "contact" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "provider_contacts_provider_id_48bddef8" ON "provider_contacts" ("provider_id");

CREATE INDEX "provider_contacts_contact_id_5b9ec26d" ON "provider_contacts" ("contact_id");

COMMIT;
