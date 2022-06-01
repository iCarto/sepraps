-- Deploy sepraps:create_tables_questionnaires to pg
BEGIN;

--
-- Create model MonthlyQuestionnaireInstance
--
CREATE TABLE "monthly_questionnaire_instance" (
    "id" serial NOT NULL PRIMARY KEY,
    "month" integer NOT NULL,
    "year" integer NOT NULL,
    "comments" text NULL,
    "created_at" timestamp with time zone NULL,
    "creation_user_id" bigint NOT NULL
);

--
-- Create model Questionnaire
--
CREATE TABLE "questionnaire" (
    "code" varchar(50) NOT NULL PRIMARY KEY,
    "version" integer NOT NULL,
    "name" varchar(100) NOT NULL,
    "category" varchar(20) NOT NULL,
    "fields" jsonb NOT NULL
);

--
-- Create model MonthlyQuestionnaireValue
--
CREATE TABLE "monthly_questionnaire_value" (
    "id" serial NOT NULL PRIMARY KEY,
    "code" varchar(50) NOT NULL,
    "datatype" varchar(20) NOT NULL,
    "label" varchar(100) NOT NULL,
    "expected_value" varchar(255) NULL,
    "value" varchar(255) NULL,
    "questionnaire_instance_id" integer NULL
);

--
-- Add field questionnaire to monthlyquestionnaireinstance
--
ALTER TABLE
    "monthly_questionnaire_instance"
ADD
    COLUMN "questionnaire_id" varchar(50) NULL CONSTRAINT "monthly_questionnair_questionnaire_id_90e05628_fk_questionn" REFERENCES "questionnaire"("code") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "monthly_questionnair_questionnaire_id_90e05628_fk_questionn" IMMEDIATE;

ALTER TABLE
    "monthly_questionnaire_instance"
ADD
    CONSTRAINT "monthly_questionnair_creation_user_id_69964110_fk_users_use" FOREIGN KEY ("creation_user_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "monthly_questionnaire_instance_creation_user_id_69964110" ON "monthly_questionnaire_instance" ("creation_user_id");

CREATE INDEX "questionnaire_code_2545a08a_like" ON "questionnaire" ("code" varchar_pattern_ops);

ALTER TABLE
    "monthly_questionnaire_value"
ADD
    CONSTRAINT "monthly_questionnair_questionnaire_instan_38902587_fk_monthly_q" FOREIGN KEY ("questionnaire_instance_id") REFERENCES "monthly_questionnaire_instance" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "monthly_questionnaire_value_questionnaire_instance_id_38902587" ON "monthly_questionnaire_value" ("questionnaire_instance_id");

CREATE INDEX "monthly_questionnaire_instance_questionnaire_id_90e05628" ON "monthly_questionnaire_instance" ("questionnaire_id");

CREATE INDEX "monthly_questionnaire_instance_questionnaire_id_90e05628_like" ON "monthly_questionnaire_instance" ("questionnaire_id" varchar_pattern_ops);

COMMIT;
