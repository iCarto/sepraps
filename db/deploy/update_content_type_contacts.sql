-- Deploy sepraps:update_content_type_contacts to pg

BEGIN;



INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'contractcontact'),
    ('app', 'contractorcontact'),
    ('app', 'providercontact');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Contacto contrato','add_contractcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractcontact'
        )),
	 ('Can change Contacto contrato','change_contractcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractcontact'
        )),
	 ('Can delete Contacto contrato','delete_contractcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractcontact'
        )),
	 ('Can view Contacto contrato','view_contractcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractcontact'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_contractcontact')
select t1.id, t2.id
from t1,t2;


INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Contacto contratista','add_contractorcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractorcontact'
        )),
	 ('Can change Contacto contratista','change_contractorcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractorcontact'
        )),
	 ('Can delete Contacto contratista','delete_contractorcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractorcontact'
        )),
	 ('Can view Contacto contratista','view_contractorcontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractorcontact'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_contractorcontact')
select t1.id, t2.id
from t1,t2;


INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Contacto prestador','add_providercontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'providercontact'
        )),
	 ('Can change Contacto prestador','change_providercontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'providercontact'
        )),
	 ('Can delete Contacto prestador','delete_providercontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'providercontact'
        )),
	 ('Can view Contacto prestador','view_providercontact',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'providercontact'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_providercontact')
select t1.id, t2.id
from t1,t2;


COMMIT;
