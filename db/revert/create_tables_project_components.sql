-- Revert sepraps:create_tables_project_components from pg

BEGIN;


--
-- Rename model ContractContact to ConstructionContractContact
--
-- (no-op)
--
-- Remove field building_component from buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" DROP COLUMN "building_component_id" CASCADE;
--
-- Remove field comments from buildingcomponentmonitoring
--
DROP TABLE "building_component_monitoring_comments" CASCADE;
--
-- Remove field created_by from buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field folder from buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field project from buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" DROP COLUMN "project_id" CASCADE;
--
-- Remove field updated_by from buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" DROP COLUMN "updated_by_id" CASCADE;
--
-- Remove field building_component from buildingcomponentvalue
--
ALTER TABLE "building_component_value" DROP COLUMN "building_component_id" CASCADE;
--
-- Remove field contract from contractproject
--
ALTER TABLE "contract_project" DROP COLUMN "contract_id" CASCADE;
--
-- Remove field project from contractproject
--
ALTER TABLE "contract_project" DROP COLUMN "project_id" CASCADE;
--
-- Remove field comments from socialcomponentmonitoring
--
DROP TABLE "social_component_monitoring_comments" CASCADE;
--
-- Remove field created_by from socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field folder from socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field project from socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" DROP COLUMN "project_id" CASCADE;
--
-- Remove field updated_by from socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" DROP COLUMN "updated_by_id" CASCADE;
--
-- Remove field contract from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "contract_id" CASCADE;
--
-- Remove field contractor from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "contractor_id" CASCADE;
--
-- Remove field created_by from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field folder from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field social_component_monitoring from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "social_component_monitoring_id" CASCADE;
--
-- Remove field updated_by from socialcomponenttraining
--
ALTER TABLE "social_component_training" DROP COLUMN "updated_by_id" CASCADE;
--
-- Remove field projects from constructioncontract
--
-- (no-op)
--
-- Add field construction_contract to project
--
ALTER TABLE "project" ADD COLUMN "construction_contract_id" integer NULL CONSTRAINT "project_construction_contrac_322d4664_fk_construct" REFERENCES "construction_contract"("id") DEFERRABLE INITIALLY DEFERRED; SET CONSTRAINTS "project_construction_contrac_322d4664_fk_construct" IMMEDIATE;
--
-- Delete model BuildingComponent
--
DROP TABLE "building_component" CASCADE;
--
-- Delete model BuildingComponentMonitoring
--
DROP TABLE "building_component_monitoring" CASCADE;
--
-- Delete model BuildingComponentValue
--
DROP TABLE "building_component_value" CASCADE;
--
-- Delete model ContractProject
--
DROP TABLE "contract_project" CASCADE;
--
-- Delete model SocialComponentMonitoring
--
DROP TABLE "social_component_monitoring" CASCADE;
--
-- Delete model SocialComponentTraining
--
DROP TABLE "social_component_training" CASCADE;
CREATE INDEX "project_construction_contract_id_322d4664" ON "project" ("construction_contract_id");

DELETE FROM public.media_node WHERE storage_path like '%buildingcomponentmonitoring%' or storage_path like '%socialcomponentmonitoring%';

--
-- Remove permissions configuration
--
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_buildingcomponent');
DELETE FROM auth_permission WHERE codename like '%_buildingcomponent';
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_buildingcomponentvalue');
DELETE FROM auth_permission WHERE codename like '%_buildingcomponentvalue';
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_buildingcomponentmonitoring');
DELETE FROM auth_permission WHERE codename like '%_buildingcomponentmonitoring';
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_socialcomponenttraining');
DELETE FROM auth_permission WHERE codename like '%_socialcomponenttraining';
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_socialcomponentmonitoring');
DELETE FROM auth_permission WHERE codename like '%_socialcomponentmonitoring';
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_contractproject');
DELETE FROM auth_permission WHERE codename like '%_contractproject';

--
-- Remove content types
--
DELETE FROM django_content_type where app_label = 'app' and model in ('buildingcomponent', 'buildingcomponentvalue', 'buildingcomponentmonitoring', 'socialcomponenttraining', 'socialcomponentmonitoring', 'contractproject');

COMMIT;
