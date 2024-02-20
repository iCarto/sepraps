-- Revert sepraps:update_tables_dynamic_fields from pg

BEGIN;

-- Alter field building_component on buildingcomponentvalue set relationship with cascade delete
--
SET CONSTRAINTS "building_component_m_building_component_i_862db2dc_fk_building_" IMMEDIATE;
SET CONSTRAINTS "building_component_v_building_component_i_6e315108_fk_building_" IMMEDIATE;
ALTER TABLE "building_component_monitoring" DROP CONSTRAINT "building_component_m_building_component_i_862db2dc_fk_building_";
ALTER TABLE "building_component_value" DROP CONSTRAINT "building_component_v_building_component_i_6e315108_fk_building_";
SET CONSTRAINTS ALL IMMEDIATE;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_building_component_i_862db2dc_fk_building_" FOREIGN KEY ("building_component_id") REFERENCES "building_component" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_value" ALTER COLUMN "building_component_id" DROP NOT NULL;
ALTER TABLE "building_component_value" ADD CONSTRAINT "building_component_v_building_component_i_6e315108_fk_building_" FOREIGN KEY ("building_component_id") REFERENCES "building_component" ("id") DEFERRABLE INITIALLY DEFERRED;

--
-- Add field properties to buildingcomponent
--
ALTER TABLE "building_component" ADD COLUMN "properties" jsonb NULL;

--
-- Remove field code_label from buildingcomponent
--
ALTER TABLE "building_component" DROP COLUMN "code_label" CASCADE;
--
-- Remove field technical_properties from buildingcomponent
--
ALTER TABLE "building_component" DROP COLUMN "technical_properties" CASCADE;
--
-- Remove field validation_properties from buildingcomponent
--
ALTER TABLE "building_component" DROP COLUMN "validation_properties" CASCADE;
--
-- Remove field labels from contractservice
--
ALTER TABLE "contract_service" DROP COLUMN "labels" CASCADE;

COMMIT;
