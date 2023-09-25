-- Deploy sepraps:update_architecture_phase2 to pg

BEGIN;

UPDATE django_content_type SET app_label = 'domains' WHERE app_label = 'monitoring' and model = 'domainentry';
UPDATE django_content_type SET app_label = 'app' WHERE app_label = 'monitoring';

INSERT INTO public.dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('gender','F','Femenino',NULL,NULL,NULL),
	 ('gender','M','Masculino',NULL,NULL,NULL),
	 ('gender','OS','Otro específico',NULL,NULL,NULL),
	 ('gender','NK','No conocido',NULL,NULL,NULL),
	 ('gender','NS','No especificado',NULL,NULL,NULL);

INSERT INTO public.dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('dominiosino','True','Sí',NULL,NULL,NULL),
	 ('dominiosino','False','No',NULL,NULL,NULL);

DELETE FROM public.dominios WHERE category = 'provider_area';

INSERT INTO public.dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('area_prestador','rural','Rural',NULL,NULL,NULL),
	 ('area_prestador','urbana','Urbana',NULL,NULL,NULL),
	 ('tipo_prestador','comision_de_agua','Comisión de agua',NULL,NULL,NULL),
	 ('tipo_prestador','comision_de_saneamiento','Comisión de saneamiento',NULL,NULL,NULL),
	 ('tipo_prestador','junta_de_saneamiento','Junta de saneamiento',NULL,NULL,NULL);

DELETE FROM public.dominios WHERE category = 'contact_post';

INSERT INTO public.dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('contact_post','representante_comunidad_beneficiaria','Representante de la comunidad beneficiaria',NULL,NULL,NULL),
	 ('contact_post','presidencia_prestador','Presidencia',NULL,NULL,NULL),
	 ('contact_post','vicepresidencia_prestador','Vicepresidencia',NULL,NULL,NULL),
	 ('contact_post','tesoreria_prestador','Tesorería',NULL,NULL,NULL),
	 ('contact_post','secretaria_prestador','Secretaría',NULL,NULL,NULL),
	 ('contact_post','vocal_prestador','Vocal',NULL,NULL,NULL),
	 ('contact_post','otra_prestador','Otra responsabilidad',NULL,NULL,NULL),
	 ('contact_post','responsable_contratista','Responsable del contratista',NULL,NULL,NULL),
	 ('contact_post','residente_obra','Residente de obra',NULL,NULL,NULL),
	 ('contact_post','fiscal_obra','Fiscal de obra',NULL,NULL,NULL);
INSERT INTO public.dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('contact_post','supervisor_obra','Supervisor de obra',NULL,NULL,NULL),
	 ('contact_post','coordinador_social','Coordinador de apoyo social',NULL,NULL,NULL),
	 ('contact_post','fiscal_social','Fiscal social',NULL,NULL,NULL),
	 ('contact_post','supervisor_social','Supervisor social',NULL,NULL,NULL),
	 ('contact_post','otro_contacto','Otro contacto',NULL,NULL,NULL);

UPDATE provider_contact SET post = 'presidencia_prestador' WHERE post = 'presidencia_junta_saneamiento';
UPDATE provider_contact SET post = 'tesoreria_prestador' WHERE post = 'tesoreria_junta_saneamiento';
UPDATE provider_contact SET post = 'secretaria_prestador' WHERE post = 'secretaria_junta_saneamiento';
UPDATE provider_contact SET post = 'otra_prestador' WHERE post = 'otra_junta_saneamiento';

COMMIT;
