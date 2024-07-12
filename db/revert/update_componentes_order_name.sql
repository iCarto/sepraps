-- Revert sepraps:update_componentes_order_name from pg

BEGIN;

ALTER TABLE "building_component_monitoring" DROP COLUMN "project_order";

ALTER TABLE "social_component_training" DROP COLUMN "name";

COMMIT;
