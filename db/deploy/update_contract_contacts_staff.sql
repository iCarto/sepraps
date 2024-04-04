-- Deploy sepraps:update_contract_contacts_staff to pg

BEGIN;

DELETE FROM dominios WHERE category = 'contact_post' AND "key"
IN (
    'responsable_contratista',
    'residente_obra',
    'fiscal_obra',
    'supervisor_obra',
    'coordinador_social',
    'fiscal_social',
    'supervisor_social'
);

UPDATE dominios SET category = 'cargo_contacto' WHERE category = 'contact_post';

UPDATE contract_supervision_area SET staff = '{supervisor_de_obra,fiscal_de_obra}' WHERE "area" = 'building';
UPDATE contract_supervision_area SET staff = '{supervisor_social,especialista_de_genero,especialista_de_area,coordinador_social,especialista_ambiental}' WHERE "area" = 'social';

COMMIT;
