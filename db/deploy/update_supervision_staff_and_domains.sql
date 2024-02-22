-- Deploy sepraps:update_supervision_staff_and_domains to pg

BEGIN;

-- Update supervision staff for every area

UPDATE contract_supervision_area SET staff = '{fiscal_obra,residente_obra,supervisor_obra}' WHERE "area" = 'building';
UPDATE contract_supervision_area SET staff = '{coordinador_social,supervisor_social}' WHERE "area" = 'social';

-- Update domimios (IMPORTANT! This change delete all domains and create new ones)

DELETE FROM dominios;

INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('frecuencia_pago','mensual','Mensual',NULL,NULL,NULL),
	 ('frecuencia_pago','no_mensual','No mensual',NULL,NULL,NULL);

INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('gender','F','Femenino',NULL,NULL,NULL),
	 ('gender','M','Masculino',NULL,NULL,NULL),
	 ('gender','OS','Otro específico',NULL,NULL,NULL),
	 ('gender','NK','No conocido',NULL,NULL,NULL),
	 ('gender','NS','No especificado',NULL,NULL,NULL),
	 ('dominiosino','True','Sí',NULL,NULL,NULL),
	 ('dominiosino','False','No',NULL,NULL,NULL),
	 ('etapas','etapa_1','Etapa 1',NULL,NULL,NULL),
	 ('etapas','etapa_2','Etapa 2',NULL,NULL,NULL),
	 ('etapas','etapa_3','Etapa 3',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('project_type','agua','Agua Potable',NULL,NULL,NULL),
	 ('project_type','agua_lluvia','Agua - Chaco',NULL,NULL,NULL),
	 ('project_type','alcantarillado','Alcantarillado',NULL,NULL,NULL),
	 ('project_type','sanitarios','Unidades de saneamiento básico (USB)',NULL,NULL,NULL),
	 ('project_class','nueva_construccion','Nueva construcción',NULL,NULL,NULL),
	 ('project_class','mejora','Mejora',NULL,NULL,NULL),
	 ('project_class','ampliacion','Ampliación',NULL,NULL,NULL),
	 ('contact_post','representante_comunidad_beneficiaria','Representante de la comunidad beneficiaria',NULL,NULL,NULL),
	 ('contact_post','presidencia_prestador','Presidencia',NULL,NULL,NULL),
	 ('contact_post','vicepresidencia_prestador','Vicepresidencia',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('contact_post','tesoreria_prestador','Tesorería',NULL,NULL,NULL),
	 ('contact_post','secretaria_prestador','Secretaría',NULL,NULL,NULL),
	 ('contact_post','vocal_prestador','Vocal',NULL,NULL,NULL),
	 ('contact_post','otra_prestador','Otra responsabilidad',NULL,NULL,NULL),
	 ('contact_post','responsable_contratista','Responsable del contratista',NULL,NULL,NULL),
	 ('contact_post','residente_obra','Residente de obra',NULL,NULL,NULL),
	 ('contact_post','fiscal_obra','Fiscal de obra',NULL,NULL,NULL),
	 ('contact_post','supervisor_obra','Supervisor de obra',NULL,NULL,NULL),
	 ('contact_post','coordinador_social','Coordinador de apoyo social',NULL,NULL,NULL),
	 ('contact_post','fiscal_social','Fiscal social',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('contact_post','supervisor_social','Supervisor social',NULL,NULL,NULL),
	 ('contact_post','otro_contacto','Otro contacto',NULL,NULL,NULL),
	 ('contractor_type','company','Empresa',NULL,NULL,NULL),
	 ('contractor_type','ngo','ONG',NULL,NULL,NULL),
	 ('contractor_type','consultant','Consultor/a',NULL,NULL,NULL),
	 ('amendment_type','amount','Monto',NULL,NULL,NULL),
	 ('amendment_type','expected_execution_period','Plazo previsto de ejecución',NULL,NULL,NULL),
	 ('amendment_type','mixed','Mixto',NULL,NULL,NULL),
	 ('tipo_tanque','hormigon','Hormigón',NULL,NULL,NULL),
	 ('tipo_tanque','metalico','Metálico',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('tipo_tanque','fibra_de_vidrio','Fibra de vidrio',NULL,NULL,NULL),
	 ('tipo_tanque','otro','Otro',NULL,NULL,NULL),
	 ('tipo_energia','monofasica','Monofásica',NULL,NULL,NULL),
	 ('tipo_energia','trifasica','Trifásica',NULL,NULL,NULL),
	 ('tipo_canheria','pvc','PVC',NULL,NULL,NULL),
	 ('tipo_canheria','hierro_galvanizado','Hierro Galvanizado',NULL,NULL,NULL),
	 ('tipo_canheria','pead','PEAD',NULL,NULL,NULL),
	 ('tipo_canheria','otro','Otro',NULL,NULL,NULL),
	 ('tipo_caseta','tipo_s_techo_de_chapa','Tipo S (Techo de chapa)',NULL,NULL,NULL),
	 ('tipo_caseta','tipo_4_techo_de_hormigon','Tipo 4 (Techo de hormigón)',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('tipo_caseta','tipo_a','Tipo A',NULL,NULL,NULL),
	 ('tipo_caseta','prefabricada','Prefabricada',NULL,NULL,NULL),
	 ('tipo_caseta','otro','Otro',NULL,NULL,NULL),
	 ('material_caseta','manposteria','Manpostería',NULL,NULL,NULL),
	 ('material_caseta','fibra_de_vidrio','Fibra de vidrio',NULL,NULL,NULL),
	 ('material_caseta','otro','Otro',NULL,NULL,NULL),
	 ('tipo_aljibe','fibra_de_vidrio','Fibra de vidrio',NULL,NULL,NULL),
	 ('tipo_aljibe','otro','Otro',NULL,NULL,NULL),
	 ('ubicacion_aljibe','superficial','Superficial',NULL,NULL,NULL),
	 ('ubicacion_aljibe','enterrado','Enterrado',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('material_letrinas','tipo_a','Tipo A',NULL,NULL,NULL),
	 ('material_letrinas','tipo_b','Tipo B',NULL,NULL,NULL),
	 ('material_letrinas','otro','Otro',NULL,NULL,NULL),
	 ('sistema_disposicion','pozo_absorbente','Pozo absorbente',NULL,NULL,NULL),
	 ('sistema_disposicion','zanja_de_infiltracion','Zanja de infiltración',NULL,NULL,NULL),
	 ('sistema_disposicion','otro','Otro',NULL,NULL,NULL),
	 ('tipo_laguna','facultativas','Facultativas',NULL,NULL,NULL),
	 ('tipo_laguna','maduracion','Maduración',NULL,NULL,NULL),
	 ('tipo_laguna','otros','Otros',NULL,NULL,NULL),
	 ('area_prestador','rural','Rural',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('area_prestador','urbana','Urbana',NULL,NULL,NULL),
	 ('tipo_prestador','comision_de_agua','Comisión de agua',NULL,NULL,NULL),
	 ('tipo_prestador','comision_de_saneamiento','Comisión de saneamiento',NULL,NULL,NULL),
	 ('tipo_prestador','junta_de_saneamiento','Junta de saneamiento',NULL,NULL,NULL),
	 ('tipo_contratista','consultora','Consultor/a',NULL,NULL,NULL),
	 ('tipo_contratista','empresa','Empresa',NULL,NULL,NULL),
	 ('tipo_contratista','ong','ONG',NULL,NULL,NULL),
	 ('institucion','senasa','SENASA',NULL,NULL,NULL),
	 ('institucion','contratista','Contratista',NULL,NULL,NULL),
	 ('cargo_contacto','residente_de_obra','Residente de obra',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('cargo_contacto','fiscal_de_obra','Fiscal de obra',NULL,NULL,NULL),
	 ('cargo_contacto','fiscal_social','Fiscal social',NULL,NULL,NULL),
	 ('cargo_contacto','responsable_del_contratista','Responsable del contratista',NULL,NULL,NULL),
	 ('cargo_contacto','supervisor_de_obra','Supervisor de obra',NULL,NULL,NULL),
	 ('cargo_contacto','supervisor_social','Supervisor social',NULL,NULL,NULL),
	 ('cargo_contacto','especialista_de_area','Especialista de área',NULL,NULL,NULL),
	 ('cargo_contacto','especialista_de_genero','Especialista de género',NULL,NULL,NULL),
	 ('cargo_contacto','especialista_ambiental','Especialista ambiental',NULL,NULL,NULL),
	 ('género_contacto','femenino','Femenino',NULL,NULL,NULL),
	 ('género_contacto','masculino','Masculino',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('género_contacto','no_conocido','No conocido',NULL,NULL,NULL),
	 ('género_contacto','no_especificado','No especificado',NULL,NULL,NULL),
	 ('género_contacto','otro_especifico','Otro específico',NULL,NULL,NULL),
	 ('tipo_monto','fijo','Fijo',NULL,NULL,NULL),
	 ('tipo_monto','maximo_minimo','Máximo / Mínimo',NULL,NULL,NULL),
	 ('frecuencia_producto','mensual','Mensual',NULL,NULL,NULL),
	 ('frecuencia_producto','no_mensual','No mensual',NULL,NULL,NULL),
	 ('criterio_pago','fijo','Fijo',NULL,NULL,NULL),
	 ('criterio_pago','variable','Variable',NULL,NULL,NULL),
	 ('criterio_pago','fijo_variable','Fijo + Variable',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('tipo_servicio','fiscalizacion_de_obra','Fiscalización de obra',NULL,NULL,NULL),
	 ('tipo_servicio','fiscalizacion_social','Fiscalización social',NULL,NULL,NULL),
	 ('tipo_servicio','ejecucion_de_obra','Ejecución de obra',NULL,NULL,NULL),
	 ('estado_producto','pendiente','Pendiente',NULL,NULL,NULL),
	 ('estado_producto','aprobado','Aprobado',NULL,NULL,NULL),
	 ('estado_producto','rechazado','Rechazado',NULL,NULL,NULL),
	 ('estado_entregable','entregado','Entregado',NULL,NULL,NULL),
	 ('estado_entregable','validado','Validado',NULL,NULL,NULL),
	 ('estado_entregable','aprobado','Aprobado',NULL,NULL,NULL),
	 ('zona_utm','centro_y_este_zona-21','Centro y Este (Zona-21)',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('zona_utm','oeste_zona_20','Oeste (Zona 20)',NULL,NULL,NULL),
	 ('tipo_proyecto','agua_potable','Agua potable',NULL,NULL,NULL),
	 ('tipo_proyecto','alcantarillado','Alcantarillado',NULL,NULL,NULL),
	 ('tipo_proyecto','unidades_de_saneamiento_basico_usb','Unidades de saneamiento básico (USB)',NULL,NULL,NULL),
	 ('origen_agua','agua_de_lluvia','Agua de lluvia',NULL,NULL,NULL),
	 ('origen_agua','fuente_de_provision','Fuente de provisión',NULL,NULL,NULL),
	 ('clase_proyecto','ampliacion','Ampliación',NULL,NULL,NULL),
	 ('clase_proyecto','mejora','Mejora',NULL,NULL,NULL),
	 ('clase_proyecto','nueva_construccion','Nueva Construcción',NULL,NULL,NULL),
	 ('area_geografica','chaco','Chaco',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('area_geografica','resto_del_pais','Resto del país',NULL,NULL,NULL),
	 ('componentes_usb','banos','Baños',NULL,NULL,NULL),
	 ('componentes_usb','letrinas','Letrinas',NULL,NULL,NULL),
	 ('estado_cualitativo','bien','Bien',NULL,NULL,NULL),
	 ('estado_cualitativo','mal','Mal',NULL,NULL,NULL),
	 ('estado_cualitativo','regular','Regular',NULL,NULL,NULL),
	 ('estado_ejecucion','en_proceso','En proceso',NULL,NULL,NULL),
	 ('estado_ejecucion','finalizado','Finalizado',NULL,NULL,NULL),
	 ('modalidad_capacitacion','in_situ','In situ',NULL,NULL,NULL),
	 ('modalidad_capacitacion','taller_zonal','Taller zonal',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('poblacion_meta','personal_de_la_comunidad_y_municipalidad','Personal de la comunidad y municipalidad',NULL,NULL,NULL),
	 ('poblacion_meta','miembros_de_la_comision_directiva_prestador','Miembros de la comisión directiva (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','tribunal_electoral_independiente_prestador','Tribunal electoral independiente (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','tesoreria_prestador','Tesorería (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','secretaria_prestador','Secretaría (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','presidencia_prestador','Presidencia (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','contador_prestador','Contador (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','plomero_prestador','Plomero (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','electricista_prestador','Electricista (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','lector_de_mediciones_prestador','Lector de mediciones (Prestador)',NULL,NULL,NULL);
INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('poblacion_meta','otro_personal_contratado_prestador','Otro personal contratado (Prestador)',NULL,NULL,NULL),
	 ('poblacion_meta','agentes_multiplicadores','Agentes multiplicadores',NULL,NULL,NULL),
	 ('poblacion_meta','docentes_de_las_instituciones_educativas','Docentes de las instituciones educativas',NULL,NULL,NULL),
	 ('poblacion_meta','estudiantes_de_las_instituciones_educativas','Estudiantes de las instituciones educativas',NULL,NULL,NULL),
	 ('poblacion_meta','personal_de_senasa','Personal de SENASA',NULL,NULL,NULL);

COMMIT;
