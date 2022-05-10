-- Deploy sepraps:create_tables_django_admin to pg
BEGIN;

--
-- Create model ContentType
--
CREATE TABLE "django_content_type" (
    "id" serial NOT NULL PRIMARY KEY,
    "app_label" varchar(100) NOT NULL,
    "model" varchar(100) NOT NULL
);

ALTER TABLE
    "django_content_type"
ADD
    CONSTRAINT "django_content_type_app_label_model_76bd3d3b_uniq" UNIQUE ("app_label", "model");

--
-- Create model Permission
--
CREATE TABLE "auth_permission" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "codename" varchar(100) NOT NULL,
    "content_type_id" integer NOT NULL
);

--
-- Create model Group
--
CREATE TABLE "auth_group" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(150) NOT NULL UNIQUE
);

CREATE TABLE "auth_group_permissions" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "group_id" integer NOT NULL,
    "permission_id" integer NOT NULL
);

--
-- Create model User
--
ALTER TABLE
    "auth_permission"
ADD
    CONSTRAINT "auth_permission_content_type_id_codename_01ab375a_uniq" UNIQUE ("content_type_id", "codename");

ALTER TABLE
    "auth_permission"
ADD
    CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission" ("content_type_id");

CREATE INDEX "auth_group_name_a6ea08ec_like" ON "auth_group" ("name" varchar_pattern_ops);

ALTER TABLE
    "auth_group_permissions"
ADD
    CONSTRAINT "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" UNIQUE ("group_id", "permission_id");

ALTER TABLE
    "auth_group_permissions"
ADD
    CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "auth_group_permissions"
ADD
    CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" ("group_id");

CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" ("permission_id");

--
-- Create model User
--
CREATE TABLE "users_user" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "password" varchar(128) NOT NULL,
    "last_login" timestamp with time zone NULL,
    "is_superuser" boolean NOT NULL,
    "username" varchar(150) NOT NULL UNIQUE,
    "first_name" varchar(150) NOT NULL,
    "last_name" varchar(150) NOT NULL,
    "email" varchar(254) NOT NULL,
    "is_staff" boolean NOT NULL,
    "is_active" boolean NOT NULL,
    "date_joined" timestamp with time zone NOT NULL
);

CREATE TABLE "users_user_groups" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "user_id" bigint NOT NULL,
    "group_id" integer NOT NULL
);

CREATE TABLE "users_user_user_permissions" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "user_id" bigint NOT NULL,
    "permission_id" integer NOT NULL
);

CREATE INDEX "users_user_username_06e46fe6_like" ON "users_user" ("username" varchar_pattern_ops);

ALTER TABLE
    "users_user_groups"
ADD
    CONSTRAINT "users_user_groups_user_id_group_id_b88eab82_uniq" UNIQUE ("user_id", "group_id");

ALTER TABLE
    "users_user_groups"
ADD
    CONSTRAINT "users_user_groups_user_id_5f6f5a90_fk_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "users_user_groups"
ADD
    CONSTRAINT "users_user_groups_group_id_9afc8d0e_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "users_user_groups_user_id_5f6f5a90" ON "users_user_groups" ("user_id");

CREATE INDEX "users_user_groups_group_id_9afc8d0e" ON "users_user_groups" ("group_id");

ALTER TABLE
    "users_user_user_permissions"
ADD
    CONSTRAINT "users_user_user_permissions_user_id_permission_id_43338c45_uniq" UNIQUE ("user_id", "permission_id");

ALTER TABLE
    "users_user_user_permissions"
ADD
    CONSTRAINT "users_user_user_permissions_user_id_20aca447_fk_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "users_user_user_permissions"
ADD
    CONSTRAINT "users_user_user_perm_permission_id_0b93982e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "users_user_user_permissions_user_id_20aca447" ON "users_user_user_permissions" ("user_id");

CREATE INDEX "users_user_user_permissions_permission_id_0b93982e" ON "users_user_user_permissions" ("permission_id");

--
-- Create model LogEntry
--
CREATE TABLE "django_admin_log" (
    "id" serial NOT NULL PRIMARY KEY,
    "action_time" timestamp with time zone NOT NULL,
    "object_id" text NULL,
    "object_repr" varchar(200) NOT NULL,
    "action_flag" smallint NOT NULL CHECK ("action_flag" >= 0),
    "change_message" text NOT NULL,
    "content_type_id" integer NULL,
    "user_id" bigint NOT NULL
);

ALTER TABLE
    "django_admin_log"
ADD
    CONSTRAINT "django_admin_log_content_type_id_c4bce8eb_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "django_admin_log"
ADD
    CONSTRAINT "django_admin_log_user_id_c564eba6_fk_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" ("content_type_id");

CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log" ("user_id");

--
-- Create model Session
--
CREATE TABLE "django_session" (
    "session_key" varchar(40) NOT NULL PRIMARY KEY,
    "session_data" text NOT NULL,
    "expire_date" timestamp with time zone NOT NULL
);

CREATE INDEX "django_session_session_key_c0390e0f_like" ON "django_session" ("session_key" varchar_pattern_ops);

CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session" ("expire_date");

COMMIT;
