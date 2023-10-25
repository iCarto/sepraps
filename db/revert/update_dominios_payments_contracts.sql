-- Revert sepraps:update_dominios_payments_contracts from pg

BEGIN;

DELETE FROM public.dominios where category in ('tipo_monto', 'frecuencia_pago', 'criterio_pago', 'tipo_servicio', 'estado_pago', 'estado_entregable');

COMMIT;
