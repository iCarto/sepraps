-- Deploy sepraps:update_componentes_order_name to pg

BEGIN;

--
-- Add field project_order to buildingcomponentmonitoring
--
ALTER TABLE "building_component_monitoring" ADD COLUMN "project_order" integer DEFAULT 0 NOT NULL;
ALTER TABLE "building_component_monitoring" ALTER COLUMN "project_order" DROP DEFAULT;
--
-- Add field name to socialcomponenttraining
--
ALTER TABLE "social_component_training" ADD COLUMN "name" varchar(255) DEFAULT '' NOT NULL;
ALTER TABLE "social_component_training" ALTER COLUMN "name" DROP DEFAULT;

COMMIT;
