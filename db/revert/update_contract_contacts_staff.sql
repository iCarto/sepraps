-- Revert sepraps:update_contract_contacts_staff from pg

BEGIN;

INSERT INTO dominios (category,"key",value,"ordering",parent,tooltip) VALUES
	 ('contact_post','responsable_contratista','Responsable del contratista',NULL,NULL,NULL),
	 ('contact_post','residente_obra','Residente de obra',NULL,NULL,NULL),
	 ('contact_post','fiscal_obra','Fiscal de obra',NULL,NULL,NULL),
	 ('contact_post','supervisor_obra','Supervisor de obra',NULL,NULL,NULL),
	 ('contact_post','coordinador_social','Coordinador de apoyo social',NULL,NULL,NULL),
	 ('contact_post','fiscal_social','Fiscal social',NULL,NULL,NULL),
	 ('contact_post','supervisor_social','Supervisor social',NULL,NULL,NULL);


UPDATE dominios SET category = 'contact_post'
WHERE category = 'cargo_contacto' AND "key" NOT IN (
    'responsable_del_contratista',
    'residente_de_obra',
    'fiscal_de_obra',
    'supervisor_de_obra',
    'coordinador_social',
    'fiscal_social',
    'supervisor_social'
) ;

UPDATE contract_supervision_area SET staff = '{fiscal_obra,residente_obra,supervisor_obra}' WHERE "area" = 'building';
UPDATE contract_supervision_area SET staff = '{coordinador_social,supervisor_social}' WHERE "area" = 'social';

COMMIT;
