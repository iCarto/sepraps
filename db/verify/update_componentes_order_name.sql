-- Verify sepraps:update_componentes_order_name on pg

BEGIN;

SELECT
    project_order
FROM
    "building_component_monitoring"
WHERE
    false;

SELECT
    name
FROM
    "social_component_training"
WHERE
    false;

ROLLBACK;
