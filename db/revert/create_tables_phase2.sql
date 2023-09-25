-- Revert sepraps:create_tables_phase2 from pg

BEGIN;
--
-- Remove field created_by from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field field_report from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "field_report_id" CASCADE;
--
-- Remove field folder from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field project from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "project_id" CASCADE;
--
-- Remove field updated_by from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "updated_by_id" CASCADE;
--
-- Remove field created_by from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field field_report_project from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "field_report_project_id" CASCADE;
--
-- Remove field folder from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field image1 from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "image1_id" CASCADE;
--
-- Remove field image2 from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "image2_id" CASCADE;
--
-- Remove field image3 from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "image3_id" CASCADE;
--
-- Remove field image4 from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "image4_id" CASCADE;
--
-- Remove field updated_by from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "updated_by_id" CASCADE;
--
-- Change Meta options on provider
--
-- (no-op)
--
-- Remove field ci_number from contact
--
ALTER TABLE "contact" DROP COLUMN "ci_number" CASCADE;
--
-- Remove field created_at from provider
--
ALTER TABLE "provider" DROP COLUMN "created_at" CASCADE;
--
-- Remove field created_by from provider
--
ALTER TABLE "provider" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from provider
--
ALTER TABLE "provider" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from provider
--
ALTER TABLE "provider" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field folder from provider
--
ALTER TABLE "provider" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field is_legalized from provider
--
ALTER TABLE "provider" DROP COLUMN "is_legalized" CASCADE;
--
-- Remove field is_provider_contract_signed from provider
--
ALTER TABLE "provider" DROP COLUMN "is_provider_contract_signed" CASCADE;
--
-- Remove field legal_status_number from provider
--
ALTER TABLE "provider" DROP COLUMN "legal_status_number" CASCADE;
--
-- Remove field legalization_date from provider
--
ALTER TABLE "provider" DROP COLUMN "legalization_date" CASCADE;
--
-- Remove field local_resolution_number from provider
--
ALTER TABLE "provider" DROP COLUMN "local_resolution_number" CASCADE;
--
-- Remove field number_of_members from provider
--
ALTER TABLE "provider" DROP COLUMN "number_of_members" CASCADE;
--
-- Remove field number_of_women from provider
--
ALTER TABLE "provider" DROP COLUMN "number_of_women" CASCADE;
--
-- Remove field type from provider
--
ALTER TABLE "provider" DROP COLUMN "type" CASCADE;
--
-- Remove field updated_at from provider
--
ALTER TABLE "provider" DROP COLUMN "updated_at" CASCADE;
--
-- Remove field updated_by from provider
--
ALTER TABLE "provider" DROP COLUMN "updated_by_id" CASCADE;
--
-- Add field locality to provider
--
ALTER TABLE "provider" ADD COLUMN "locality_id" varchar(10) CONSTRAINT "provider_locality_id_d1ba5c1e_fk_locality_code" REFERENCES "locality"("code") DEFERRABLE INITIALLY DEFERRED; SET CONSTRAINTS "provider_locality_id_d1ba5c1e_fk_locality_code" IMMEDIATE;
ALTER TABLE "provider" ALTER COLUMN "locality_id" DROP DEFAULT;
--
-- Alter field comments on contact
--
ALTER TABLE "contact" ALTER COLUMN "comments" SET DEFAULT '';
UPDATE "contact" SET "comments" = '' WHERE "comments" IS NULL; SET CONSTRAINTS ALL IMMEDIATE;
ALTER TABLE "contact" ALTER COLUMN "comments" SET NOT NULL;
ALTER TABLE "contact" ALTER COLUMN "comments" DROP DEFAULT;
--
-- Alter field email on contact
--
ALTER TABLE "contact" ALTER COLUMN "email" SET DEFAULT '';
UPDATE "contact" SET "email" = '' WHERE "email" IS NULL; SET CONSTRAINTS ALL IMMEDIATE;
ALTER TABLE "contact" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE "contact" ALTER COLUMN "email" DROP DEFAULT;
--
-- Alter field gender on contact
--
-- (no-op)
--
-- Alter field phone on contact
--
ALTER TABLE "contact" ALTER COLUMN "phone" SET DEFAULT '';
UPDATE "contact" SET "phone" = '' WHERE "phone" IS NULL; SET CONSTRAINTS ALL IMMEDIATE;
ALTER TABLE "contact" ALTER COLUMN "phone" SET NOT NULL;
ALTER TABLE "contact" ALTER COLUMN "phone" DROP DEFAULT;
--
-- Alter field provider on project
--
-- (no-op)
--
-- Alter field area on provider
--
ALTER TABLE "provider" ALTER COLUMN "area" DROP NOT NULL;
--
-- Alter field id on provider
--
SET CONSTRAINTS "project_provider_id_c9e0bf5d_fk" IMMEDIATE; ALTER TABLE "project" DROP CONSTRAINT "project_provider_id_c9e0bf5d_fk";
SET CONSTRAINTS "provider_contact_entity_id_879cd13b_fk" IMMEDIATE; ALTER TABLE "provider_contact" DROP CONSTRAINT "provider_contact_entity_id_879cd13b_fk";
ALTER TABLE "provider" ALTER COLUMN "id" TYPE integer USING "id"::integer;
ALTER SEQUENCE IF EXISTS "provider_id_seq" AS integer;
ALTER TABLE "project" ALTER COLUMN "provider_id" TYPE integer USING "provider_id"::integer;
ALTER TABLE "provider_contact" ALTER COLUMN "entity_id" TYPE integer USING "entity_id"::integer;
ALTER TABLE "project" ADD CONSTRAINT "project_provider_id_c9e0bf5d_fk_provider_id" FOREIGN KEY ("provider_id") REFERENCES "provider" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "provider_contact" ADD CONSTRAINT "provider_contact_entity_id_879cd13b_fk_provider_id" FOREIGN KEY ("entity_id") REFERENCES "provider" ("id") DEFERRABLE INITIALLY DEFERRED;
--
-- Alter field name on provider
--
ALTER TABLE "provider" ALTER COLUMN "name" DROP NOT NULL;

CREATE INDEX "provider_locality_id_d1ba5c1e" ON "provider" ("locality_id");
CREATE INDEX "provider_locality_id_d1ba5c1e_like" ON "provider" ("locality_id" varchar_pattern_ops);

--
-- Remove permissions configuration
--
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_fieldreport%');
DELETE FROM auth_permission WHERE codename like '%_fieldreport%';

--
-- Remove content types
--
DELETE FROM django_content_type where app_label = 'app' and model in ('field_report', 'field_report_project', 'field_report_project_activity');

--
-- Delete model FieldReport
--
DROP TABLE "field_report" CASCADE;
--
-- Delete model FieldReportProject
--
DROP TABLE "field_report_project" CASCADE;
--
-- Delete model FieldReportProjectActivity
--
DROP TABLE "field_report_project_activity" CASCADE;

COMMIT;
