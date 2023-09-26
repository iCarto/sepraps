-- Deploy sepraps:update_domains_new_project_classes to pg

BEGIN;

INSERT INTO public.dominios (category,"key",value) VALUES
	 ('project_type','alcantarillado','Alcantarillado'),
	 ('project_type','sanitarios','Unidades de saneamiento básico (USB)');


COMMIT;
