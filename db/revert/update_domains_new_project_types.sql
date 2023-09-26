-- Revert sepraps:update_domains_new_project_classes from pg

BEGIN;

DELETE FROM public.dominios where category = 'project_type' and "key" in('alcantarillado','sanitarios');

COMMIT;
