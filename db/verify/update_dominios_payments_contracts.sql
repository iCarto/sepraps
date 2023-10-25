-- Verify sepraps:update_dominios_payments_contracts on pg

BEGIN;

SELECT
    *
FROM
    dominios
WHERE
    category in ('tipo_monto', 'frecuencia_pago', 'criterio_pago', 'tipo_servicio', 'estado_pago', 'estado_entregable');

ROLLBACK;
