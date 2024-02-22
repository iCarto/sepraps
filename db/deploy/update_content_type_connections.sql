-- Deploy sepraps:update_content_type_connections to pg

BEGIN;


INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'connection');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Conexión','add_connection',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'connection'
        )),
	 ('Can change Conexión','change_connection',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'connection'
        )),
	 ('Can delete Conexión','delete_connection',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'connection'
        )),
	 ('Can view Conexión','view_connection',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'connection'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_connection')
select t1.id, t2.id
from t1,t2;


COMMIT;
