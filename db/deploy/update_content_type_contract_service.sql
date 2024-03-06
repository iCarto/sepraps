-- Deploy sepraps:update_content_type_contract_service to pg

BEGIN;


INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'contractservice');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Servicio de contrato','add_contractservice',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservice'
        )),
	 ('Can change Servicio de contrato','change_contractservice',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservice'
        )),
	 ('Can delete Servicio de contrato','delete_contractservice',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservice'
        )),
	 ('Can view Servicio de contrato','view_contractservice',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservice'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_contractservice')
select t1.id, t2.id
from t1,t2;


COMMIT;
