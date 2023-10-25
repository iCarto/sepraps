-- Deploy sepraps:update_dominios_payments_contracts to pg

BEGIN;

INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('tipo_monto','fijo','Fijo',NULL,NULL,NULL),
	 ('tipo_monto','maximo_minimo','Máximo / mínimo',NULL,NULL,NULL),
	 ('frecuencia_pago','mensual','Mensual',NULL,NULL,NULL),
	 ('frecuencia_pago','no_mensual','No mensual',NULL,NULL,NULL),
	 ('criterio_pago','fijo','Fijo',NULL,NULL,NULL),
	 ('criterio_pago','variable','Variable',NULL,NULL,NULL),
	 ('criterio_pago','fijo_variable','Fijo + Variable',NULL,NULL,NULL),
	 ('tipo_servicio','fiscalizacion_de_obra','Fiscalización de obra',NULL,NULL,NULL),
	 ('tipo_servicio','fiscalizacion_social','Fiscalización social',NULL,NULL,NULL),
	 ('tipo_servicio','ejecucion_de_obra','Ejecución de obra',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('estado_pago','pagado','Pagado',NULL,NULL,NULL),
	 ('estado_pago','no_pagado','No pagado',NULL,NULL,NULL),
	 ('estado_pago','anulado','Anulado',NULL,NULL,NULL),
	 ('estado_entregable','entregado','Entregado',NULL,NULL,NULL),
	 ('estado_entregable','validado','Validado',NULL,NULL,NULL),
	 ('estado_entregable','aprobado','Aprobado',NULL,NULL,NULL);


COMMIT;
