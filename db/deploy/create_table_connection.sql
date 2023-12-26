-- Deploy sepraps:create_table_connection to pg

BEGIN;

--
-- Create model Connection
--
CREATE TABLE "connection" ("id" integer NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "created_at" timestamp with time zone NULL, "updated_at" timestamp with time zone NULL, "active" boolean NOT NULL, "number_of_households" integer NULL, "number_of_existing_connections" integer NULL, "number_of_planned_connections" integer NULL, "number_of_actual_connections" integer NULL, "created_by_id" bigint NOT NULL, "featured_document_id" integer NULL, "featured_image_id" integer NULL, "folder_id" integer NULL, "project_id" integer NOT NULL, "updated_by_id" bigint NOT NULL);
CREATE TABLE "connection_comments" ("id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "connection_id" integer NOT NULL, "comment_id" integer NOT NULL);
ALTER TABLE "connection" ADD CONSTRAINT "connection_created_by_id_88b30554_fk_users_user_id" FOREIGN KEY ("created_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "connection" ADD CONSTRAINT "connection_featured_document_id_ffd5513c_fk_media_node_id" FOREIGN KEY ("featured_document_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "connection" ADD CONSTRAINT "connection_featured_image_id_c796a4ee_fk_media_node_id" FOREIGN KEY ("featured_image_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "connection" ADD CONSTRAINT "connection_folder_id_9d97a009_fk_media_node_id" FOREIGN KEY ("folder_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "connection" ADD CONSTRAINT "connection_project_id_8d9e3fa2_fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "connection" ADD CONSTRAINT "connection_updated_by_id_fd99825b_fk_users_user_id" FOREIGN KEY ("updated_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "connection_created_by_id_88b30554" ON "connection" ("created_by_id");
CREATE INDEX "connection_featured_document_id_ffd5513c" ON "connection" ("featured_document_id");
CREATE INDEX "connection_featured_image_id_c796a4ee" ON "connection" ("featured_image_id");
CREATE INDEX "connection_folder_id_9d97a009" ON "connection" ("folder_id");
CREATE INDEX "connection_project_id_8d9e3fa2" ON "connection" ("project_id");
CREATE INDEX "connection_updated_by_id_fd99825b" ON "connection" ("updated_by_id");
ALTER TABLE "connection_comments" ADD CONSTRAINT "connection_comments_connection_id_comment_id_33536e6a_uniq" UNIQUE ("connection_id", "comment_id");
ALTER TABLE "connection_comments" ADD CONSTRAINT "connection_comments_connection_id_27a7c670_fk_connection_id" FOREIGN KEY ("connection_id") REFERENCES "connection" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "connection_comments" ADD CONSTRAINT "connection_comments_comment_id_3b9310fe_fk_comment_id" FOREIGN KEY ("comment_id") REFERENCES "comment" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "connection_comments_connection_id_27a7c670" ON "connection_comments" ("connection_id");
CREATE INDEX "connection_comments_comment_id_3b9310fe" ON "connection_comments" ("comment_id");


-- Insert connection default data

INSERT INTO "connection"
(project_id, created_by_id, updated_by_id, created_at, updated_at, active)
SELECT
	p.id,
	1,1,now(),now(),true
FROM project p;

INSERT INTO public.media_node
(media_type, media_name, storage_path, created_at, creation_user_id)
SELECT
	'FOLDER',
	'Connection_' || c.id,
	'connection/' || c.id,
	now(),
	1
FROM "connection" c;

UPDATE "connection" c
SET folder_id = mn.id
FROM media_node mn where mn.storage_path = 'connection/' || c.id;

COMMIT;