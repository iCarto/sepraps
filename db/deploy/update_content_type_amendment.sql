-- Deploy sepraps:update_content_type_amendment to pg

BEGIN;


INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'amendment');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Adenda','add_amendment',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'amendment'
        )),
	 ('Can change Adenda','change_amendment',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'amendment'
        )),
	 ('Can delete Adenda','delete_amendment',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'amendment'
        )),
	 ('Can view Adenda','view_amendment',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'amendment'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_amendment')
select t1.id, t2.id
from t1,t2;



COMMIT;
