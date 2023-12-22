-- Deploy sepraps:update_payments_by_products to pg

BEGIN;

ALTER TABLE construction_contract
    RENAME COLUMN execution_certificate_start_date TO execution_start_date;
ALTER TABLE construction_contract
    RENAME COLUMN payment_frequency_type TO product_frequency_type;

ALTER TABLE payment
    RENAME COLUMN expected_payment_date TO expected_approval_date;
ALTER TABLE payment
    RENAME COLUMN payment_date TO approval_date;

-- Create defaults config for components

ALTER TABLE building_component DROP COLUMN IF EXISTS project_id_aux;


-- Update dominios

DELETE FROM public.dominios where category in ('frecuencia_pago', 'estado_pago');

INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('frecuencia_producto','mensual','Mensual',NULL,NULL,NULL),
	 ('frecuencia_producto','no_mensual','No mensual',NULL,NULL,NULL),
	 ('estado_producto','pendiente','Pendiente',NULL,NULL,NULL),
	 ('estado_producto','aprobado','Aprobado',NULL,NULL,NULL),
	 ('estado_producto','rechazado','Rechazado',NULL,NULL,NULL),
	 ('estado_ejecucion','en_proceso','En proceso',NULL,NULL,NULL),
	 ('estado_ejecucion','finalizado','Finalizado',NULL,NULL,NULL),
	 ('estado_cualitativo','bien','Bien',NULL,NULL,NULL),
	 ('estado_cualitativo','mal','Mal',NULL,NULL,NULL),
	 ('estado_cualitativo','regular','Regular',NULL,NULL,NULL);

INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('modalidad_capacitacion','in_situ','In situ',NULL,NULL,NULL),
	 ('modalidad_capacitacion','taller_zonal','Taller zonal',NULL,NULL,NULL),
	 ('poblacion_meta','personal_de_la_comunidad_y_municipalidad','Personal de la comunidad y municipalidad',NULL,NULL,NULL),
	 ('poblacion_meta','miembros_de_la_comision_directiva_prestador','Miembros de la comisión directiva (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','tribunal_electoral_independiente_prestador','Tribunal electoral independiente (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','tesoreria_prestador','Tesorería (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','secretaria_prestador','Secretaría (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','presidencia_prestador','Presidencia (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','contador_prestador','Contador (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','plomero_prestador','Plomero (Prestador)',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('poblacion_meta','electricista_prestador','Electricista (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','lector_de_mediciones_prestador','Lector de mediciones (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','otro_personal_contratado_prestador','Otro personal contratado (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','agentes_multiplicadores','Agentes multiplicadores',NULL,NULL,NULL),
	 ('poblacion_meta','docentes_de_las_instituciones_educativas','Docentes de las instituciones educativas',NULL,NULL,NULL),
	 ('poblacion_meta','estudiantes_de_las_instituciones_educativas','Estudiantes de las instituciones educativas',NULL,NULL,NULL),
	 ('poblacion_meta','personal_de_senasa','Personal de SENASA',NULL,NULL,NULL);


COMMIT;
