-- Deploy sepraps:create_relationship_project_questionnaire to pg
BEGIN;

--
-- Add field questionnaires to project
--
CREATE TABLE "project_questionnaires" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "project_id" integer NOT NULL,
    "questionnaire_id" varchar(50) NOT NULL
);

--
-- Create model ProjectQuestionnaireInstance
--
CREATE TABLE "project_questionnaire_instance" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "project_id" integer NOT NULL,
    "questionnaire_id" varchar(50) NOT NULL,
    "questionnaire_instance_id" integer NOT NULL
);

--
-- Add field questionnaires_instances to project
--
ALTER TABLE
    "project_questionnaires"
ADD
    CONSTRAINT "project_questionnaires_project_id_questionnaire_ab9cbdb0_uniq" UNIQUE ("project_id", "questionnaire_id");

ALTER TABLE
    "project_questionnaires"
ADD
    CONSTRAINT "project_questionnaires_project_id_2d986c76_fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project_questionnaires"
ADD
    CONSTRAINT "project_questionnair_questionnaire_id_4a9c2f57_fk_questionn" FOREIGN KEY ("questionnaire_id") REFERENCES "questionnaire" ("code") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "project_questionnaires_project_id_2d986c76" ON "project_questionnaires" ("project_id");

CREATE INDEX "project_questionnaires_questionnaire_id_4a9c2f57" ON "project_questionnaires" ("questionnaire_id");

CREATE INDEX "project_questionnaires_questionnaire_id_4a9c2f57_like" ON "project_questionnaires" ("questionnaire_id" varchar_pattern_ops);

ALTER TABLE
    "project_questionnaire_instance"
ADD
    CONSTRAINT "project_questionnair_project_id_011c26e9_fk_project_i" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project_questionnaire_instance"
ADD
    CONSTRAINT "project_questionnair_questionnaire_id_5d570823_fk_questionn" FOREIGN KEY ("questionnaire_id") REFERENCES "questionnaire" ("code") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project_questionnaire_instance"
ADD
    CONSTRAINT "project_questionnair_questionnaire_instan_f1df68e9_fk_monthly_q" FOREIGN KEY ("questionnaire_instance_id") REFERENCES "monthly_questionnaire_instance" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "project_questionnaire_instance_project_id_011c26e9" ON "project_questionnaire_instance" ("project_id");

CREATE INDEX "project_questionnaire_instance_questionnaire_id_5d570823" ON "project_questionnaire_instance" ("questionnaire_id");

CREATE INDEX "project_questionnaire_instance_questionnaire_id_5d570823_like" ON "project_questionnaire_instance" ("questionnaire_id" varchar_pattern_ops);

CREATE INDEX "project_questionnaire_inst_questionnaire_instance_id_f1df68e9" ON "project_questionnaire_instance" ("questionnaire_instance_id");

COMMIT;
