-- Deploy sepraps:create_table_certification to pg

BEGIN;

--
-- Create model Certification
--
CREATE TABLE "certification" ("id" integer NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "created_at" timestamp with time zone NULL, "updated_at" timestamp with time zone NULL, "active" boolean NOT NULL, "expected_amount" numeric(20, 2) NULL, "approved_amount" numeric(20, 2) NULL, "notes" text NULL, "created_by_id" bigint NOT NULL, "featured_document_id" integer NULL, "featured_image_id" integer NULL, "folder_id" integer NULL, "payment_id" integer NOT NULL, "project_id" integer NOT NULL, "updated_by_id" bigint NOT NULL);
CREATE TABLE "certification_comments" ("id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "certification_id" integer NOT NULL, "comment_id" integer NOT NULL);
ALTER TABLE "certification" ADD CONSTRAINT "certification_created_by_id_090c4415_fk_users_user_id" FOREIGN KEY ("created_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "certification" ADD CONSTRAINT "certification_featured_document_id_9957e636_fk_media_node_id" FOREIGN KEY ("featured_document_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "certification" ADD CONSTRAINT "certification_featured_image_id_22ba7256_fk_media_node_id" FOREIGN KEY ("featured_image_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "certification" ADD CONSTRAINT "certification_folder_id_10acef9b_fk_media_node_id" FOREIGN KEY ("folder_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "certification" ADD CONSTRAINT "certification_payment_id_60cb375d_fk_payment_id" FOREIGN KEY ("payment_id") REFERENCES "payment" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "certification" ADD CONSTRAINT "certification_project_id_00745859_fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "certification" ADD CONSTRAINT "certification_updated_by_id_ef722b6f_fk_users_user_id" FOREIGN KEY ("updated_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "certification_created_by_id_090c4415" ON "certification" ("created_by_id");
CREATE INDEX "certification_featured_document_id_9957e636" ON "certification" ("featured_document_id");
CREATE INDEX "certification_featured_image_id_22ba7256" ON "certification" ("featured_image_id");
CREATE INDEX "certification_folder_id_10acef9b" ON "certification" ("folder_id");
CREATE INDEX "certification_payment_id_60cb375d" ON "certification" ("payment_id");
CREATE INDEX "certification_project_id_00745859" ON "certification" ("project_id");
CREATE INDEX "certification_updated_by_id_ef722b6f" ON "certification" ("updated_by_id");
ALTER TABLE "certification_comments" ADD CONSTRAINT "certification_comments_certification_id_comment_aa948a2b_uniq" UNIQUE ("certification_id", "comment_id");
ALTER TABLE "certification_comments" ADD CONSTRAINT "certification_commen_certification_id_a941fbae_fk_certifica" FOREIGN KEY ("certification_id") REFERENCES "certification" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "certification_comments" ADD CONSTRAINT "certification_comments_comment_id_0f2d769c_fk_comment_id" FOREIGN KEY ("comment_id") REFERENCES "comment" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "certification_comments_certification_id_a941fbae" ON "certification_comments" ("certification_id");
CREATE INDEX "certification_comments_comment_id_0f2d769c" ON "certification_comments" ("comment_id");

-- Permissions

INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'certification');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Certificación','add_certification',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'certification'
        )),
	 ('Can change Certificación','change_certification',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'certification'
        )),
	 ('Can delete Certificación','delete_certification',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'certification'
        )),
	 ('Can view Certificación','view_certification',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'certification'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_certification')
select t1.id, t2.id
from t1,t2;

COMMIT;
