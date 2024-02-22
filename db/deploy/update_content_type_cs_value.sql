-- Deploy sepraps:update_content_type_cs_value to pg

BEGIN;


INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'contractservicevalue');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Valor de servicio de contrato','add_contractservicevalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservicevalue'
        )),
	 ('Can change Valor de servicio de contrato','change_contractservicevalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservicevalue'
        )),
	 ('Can delete Valor de servicio de contrato','delete_contractservicevalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservicevalue'
        )),
	 ('Can view Valor de servicio de contrato','view_contractservicevalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractservicevalue'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_contractservicevalue')
select t1.id, t2.id
from t1,t2;



COMMIT;
