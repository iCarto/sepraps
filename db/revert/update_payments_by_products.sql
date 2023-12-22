-- Revert sepraps:update_payments_by_products from pg

BEGIN;

ALTER TABLE construction_contract
    RENAME COLUMN execution_start_date TO execution_certificate_start_date;
ALTER TABLE construction_contract
    RENAME COLUMN product_frequency_type TO payment_frequency_type;

ALTER TABLE payment
    RENAME COLUMN expected_approval_date TO expected_payment_date;
ALTER TABLE payment
    RENAME COLUMN approval_date TO payment_date;

-- Update domains

DELETE FROM public.dominios where category in ('frecuencia_producto', 'estado_producto', 'estado_ejecucion', 'estado_cualitativo', 'modalidad_capacitacion', 'poblacion_meta');

INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('frecuencia_pago','mensual','Mensual',NULL,NULL,NULL),
	 ('frecuencia_pago','no_mensual','No mensual',NULL,NULL,NULL),
	 ('estado_pago','pagado','Pagado',NULL,NULL,NULL),
	 ('estado_pago','no_pagado','No pagado',NULL,NULL,NULL),
	 ('estado_pago','anulado','Anulado',NULL,NULL,NULL);

COMMIT;
