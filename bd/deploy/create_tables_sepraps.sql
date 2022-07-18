-- Deploy sepraps:create_tables_sepraps to pg
BEGIN;

--
-- Create model MediaNode
--
CREATE TABLE "media_node" (
    "id" serial NOT NULL PRIMARY KEY,
    "media_type" varchar(10) NOT NULL,
    "media_name" varchar(100) NOT NULL,
    "media_content_type" varchar(100) NULL,
    "media_size" bigint NULL,
    "storage_path" varchar(512) NULL,
    "created_at" timestamp with time zone NULL,
    "creation_user_id" bigint NOT NULL,
    "parent_id" integer NULL
);

--
-- Create proxy model Document
--
--
-- Create proxy model Folder
--
ALTER TABLE
    "media_node"
ADD
    CONSTRAINT "media_node_creation_user_id_c6f9e54d_fk_users_user_id" FOREIGN KEY ("creation_user_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "media_node"
ADD
    CONSTRAINT "media_node_parent_id_4bdc0ab4_fk_media_node_id" FOREIGN KEY ("parent_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "media_node_creation_user_id_c6f9e54d" ON "media_node" ("creation_user_id");

CREATE INDEX "media_node_parent_id_4bdc0ab4" ON "media_node" ("parent_id");

--
-- Create model ConstructionContract
--
CREATE TABLE "construction_contract" (
    "id" serial NOT NULL PRIMARY KEY,
    "number" varchar(50) NOT NULL,
    "comments" text NULL,
    "bid_request_number" varchar(50) NOT NULL,
    "bid_request_id" varchar(50) NOT NULL,
    "bid_request_date" date NOT NULL,
    "bid_request_budget" numeric(20, 2) NOT NULL,
    "bid_request_deadline" integer NOT NULL,
    "awarding_budget" numeric(20, 2) NULL,
    "awarding_percentage_drop" numeric(5, 2) NULL,
    "awarding_date" date NULL,
    "execution_signature_date" date NULL,
    "execution_order_start_date" date NULL,
    "execution_certificate_start_date" date NULL,
    "execution_expected_delivery_date" date NULL,
    "execution_final_delivery_date" date NULL,
    "closed" boolean NOT NULL,
    "created_at" timestamp with time zone NULL,
    "updated_at" timestamp with time zone NULL
);

--
-- Create model Contact
--
CREATE TABLE "contact" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "post" varchar(50) NULL,
    "gender" varchar(2) NOT NULL,
    "phone" varchar(20) NOT NULL,
    "email" varchar(255) NOT NULL,
    "comments" text NOT NULL,
    "is_staff" boolean NOT NULL
);

--
-- Create model Department
--
CREATE TABLE "department" (
    "code" varchar(10) NOT NULL PRIMARY KEY,
    "name" varchar(255) NOT NULL
);

--
-- Create model District
--
CREATE TABLE "district" (
    "code" varchar(10) NOT NULL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "department_id" varchar(10) NOT NULL
);

--
-- Create model DomainEntry
--
CREATE TABLE "dominios" (
    "id" serial NOT NULL PRIMARY KEY,
    "category" varchar(20) NOT NULL,
    "key" varchar(50) NOT NULL,
    "value" varchar(50) NOT NULL,
    "ordering" integer NULL,
    "parent" varchar(30) NULL,
    "tooltip" text NULL
);

--
-- Create model FinancingFund
--
CREATE TABLE "financing_fund" (
    "id" serial NOT NULL PRIMARY KEY,
    "short_name" varchar(30) NOT NULL,
    "name" varchar(100) NOT NULL
);

--
-- Create model FinancingProgram
--
CREATE TABLE "financing_program" (
    "id" serial NOT NULL PRIMARY KEY,
    "short_name" varchar(30) NOT NULL,
    "name" varchar(100) NOT NULL,
    "financing_fund_id" integer NOT NULL
);

--
-- Create model Infrastructure
--
CREATE TABLE "infrastructure" (
    "id" serial NOT NULL PRIMARY KEY,
    "latitude" numeric(8, 5) NOT NULL,
    "longitude" numeric(8, 5) NOT NULL,
    "altitude" integer NULL
);

--
-- Create model Locality
--
CREATE TABLE "locality" (
    "code" varchar(10) NOT NULL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "department_id" varchar(10) NOT NULL,
    "district_id" varchar(10) NOT NULL
);

--
-- Create model Provider
--
CREATE TABLE "provider" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(100) NULL,
    "area" varchar(50) NULL,
    "locality_id" varchar(10) NOT NULL
);

CREATE TABLE "provider_contacts" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "provider_id" integer NOT NULL,
    "contact_id" integer NOT NULL
);

--
-- Create model Project
--
CREATE TABLE "project" (
    "id" serial NOT NULL PRIMARY KEY,
    "code" varchar(30) NOT NULL UNIQUE,
    "project_type" varchar(50) NULL,
    "project_class" varchar(50) NULL,
    "description" varchar(255) NOT NULL,
    "init_date" date NOT NULL,
    "closed" boolean NOT NULL,
    "created_at" timestamp with time zone NULL,
    "updated_at" timestamp with time zone NULL,
    "construction_contract_id" integer NULL,
    "creation_user_id" bigint NOT NULL,
    "financing_fund_id" integer NULL,
    "financing_program_id" integer NULL,
    "folder_id" integer NULL,
    "main_infrastructure_id" integer NOT NULL UNIQUE,
    "provider_id" integer NULL
);

CREATE TABLE "project_linked_localities" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "project_id" integer NOT NULL,
    "locality_id" varchar(10) NOT NULL
);

--
-- Create model Milestone
--
CREATE TABLE "milestone" (
    "id" serial NOT NULL PRIMARY KEY,
    "category" varchar(50) NOT NULL,
    "phase" varchar(50) NOT NULL,
    "compliance_date" date NULL,
    "ordering" integer NOT NULL,
    "parent_id" integer NULL,
    "project_id" integer NOT NULL
);

--
-- Add field locality to infrastructure
--
ALTER TABLE
    "infrastructure"
ADD
    COLUMN "locality_id" varchar(10) NULL CONSTRAINT "infrastructure_locality_id_cf188235_fk_locality_code" REFERENCES "locality"("code") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "infrastructure_locality_id_cf188235_fk_locality_code" IMMEDIATE;

--
-- Create model Contractor
--
CREATE TABLE "contractor" (
    "id" serial NOT NULL PRIMARY KEY,
    "name" varchar(100) NOT NULL,
    "contractor_type" varchar(50) NULL,
    "address" text NULL,
    "phone" varchar(20) NULL,
    "email" varchar(255) NULL,
    "comments" text NULL
);

CREATE TABLE "contractor_contacts" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "contractor_id" integer NOT NULL,
    "contact_id" integer NOT NULL
);

--
-- Add field construction_inspector to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "construction_inspector_id" integer NULL CONSTRAINT "construction_contrac_construction_inspect_cec0a020_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_construction_inspect_cec0a020_fk_contact_i" IMMEDIATE;

--
-- Add field construction_supervisor to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "construction_supervisor_id" integer NULL CONSTRAINT "construction_contrac_construction_supervi_d9de0cb4_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_construction_supervi_d9de0cb4_fk_contact_i" IMMEDIATE;

--
-- Add field contractor to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "contractor_id" integer NULL CONSTRAINT "construction_contract_contractor_id_64a27f30_fk_contractor_id" REFERENCES "contractor"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contract_contractor_id_64a27f30_fk_contractor_id" IMMEDIATE;

--
-- Add field creation_user to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "creation_user_id" bigint NOT NULL CONSTRAINT "construction_contrac_creation_user_id_f94ff2cd_fk_users_use" REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_creation_user_id_f94ff2cd_fk_users_use" IMMEDIATE;

--
-- Add field field_manager to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "field_manager_id" integer NULL CONSTRAINT "construction_contract_field_manager_id_de254bc0_fk_contact_id" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contract_field_manager_id_de254bc0_fk_contact_id" IMMEDIATE;

--
-- Add field social_coordinator to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "social_coordinator_id" integer NULL CONSTRAINT "construction_contrac_social_coordinator_i_3af3f68a_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_social_coordinator_i_3af3f68a_fk_contact_i" IMMEDIATE;

--
-- Add field social_inspector to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "social_inspector_id" integer NULL CONSTRAINT "construction_contrac_social_inspector_id_e21bc955_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_social_inspector_id_e21bc955_fk_contact_i" IMMEDIATE;

--
-- Add field social_supervisor to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "social_supervisor_id" integer NULL CONSTRAINT "construction_contrac_social_supervisor_id_b6f8c802_fk_contact_i" REFERENCES "contact"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_social_supervisor_id_b6f8c802_fk_contact_i" IMMEDIATE;

CREATE INDEX "department_code_2c255187_like" ON "department" ("code" varchar_pattern_ops);

ALTER TABLE
    "district"
ADD
    CONSTRAINT "district_department_id_15759f1b_fk_department_code" FOREIGN KEY ("department_id") REFERENCES "department" ("code") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "district_code_27d4224b_like" ON "district" ("code" varchar_pattern_ops);

CREATE INDEX "district_department_id_15759f1b" ON "district" ("department_id");

CREATE INDEX "district_department_id_15759f1b_like" ON "district" ("department_id" varchar_pattern_ops);

ALTER TABLE
    "financing_program"
ADD
    CONSTRAINT "financing_program_financing_fund_id_c55e6217_fk_financing" FOREIGN KEY ("financing_fund_id") REFERENCES "financing_fund" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "financing_program_financing_fund_id_c55e6217" ON "financing_program" ("financing_fund_id");

ALTER TABLE
    "locality"
ADD
    CONSTRAINT "locality_department_id_e7ee5261_fk_department_code" FOREIGN KEY ("department_id") REFERENCES "department" ("code") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "locality"
ADD
    CONSTRAINT "locality_district_id_5de32e04_fk_district_code" FOREIGN KEY ("district_id") REFERENCES "district" ("code") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "locality_code_da922921_like" ON "locality" ("code" varchar_pattern_ops);

CREATE INDEX "locality_department_id_e7ee5261" ON "locality" ("department_id");

CREATE INDEX "locality_department_id_e7ee5261_like" ON "locality" ("department_id" varchar_pattern_ops);

CREATE INDEX "locality_district_id_5de32e04" ON "locality" ("district_id");

CREATE INDEX "locality_district_id_5de32e04_like" ON "locality" ("district_id" varchar_pattern_ops);

ALTER TABLE
    "provider"
ADD
    CONSTRAINT "provider_locality_id_d1ba5c1e_fk_locality_code" FOREIGN KEY ("locality_id") REFERENCES "locality" ("code") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "provider_locality_id_d1ba5c1e" ON "provider" ("locality_id");

CREATE INDEX "provider_locality_id_d1ba5c1e_like" ON "provider" ("locality_id" varchar_pattern_ops);

ALTER TABLE
    "provider_contacts"
ADD
    CONSTRAINT "provider_contacts_provider_id_contact_id_0aab376f_uniq" UNIQUE ("provider_id", "contact_id");

ALTER TABLE
    "provider_contacts"
ADD
    CONSTRAINT "provider_contacts_provider_id_48bddef8_fk_provider_id" FOREIGN KEY ("provider_id") REFERENCES "provider" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "provider_contacts"
ADD
    CONSTRAINT "provider_contacts_contact_id_5b9ec26d_fk_contact_id" FOREIGN KEY ("contact_id") REFERENCES "contact" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "provider_contacts_provider_id_48bddef8" ON "provider_contacts" ("provider_id");

CREATE INDEX "provider_contacts_contact_id_5b9ec26d" ON "provider_contacts" ("contact_id");

ALTER TABLE
    "project"
ADD
    CONSTRAINT "project_construction_contrac_322d4664_fk_construct" FOREIGN KEY ("construction_contract_id") REFERENCES "construction_contract" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project"
ADD
    CONSTRAINT "project_creation_user_id_802d4da9_fk_users_user_id" FOREIGN KEY ("creation_user_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project"
ADD
    CONSTRAINT "project_financing_fund_id_fc988f79_fk_financing_fund_id" FOREIGN KEY ("financing_fund_id") REFERENCES "financing_fund" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project"
ADD
    CONSTRAINT "project_financing_program_id_167c4fbc_fk_financing_program_id" FOREIGN KEY ("financing_program_id") REFERENCES "financing_program" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project"
ADD
    CONSTRAINT "project_folder_id_d180e373_fk_media_node_id" FOREIGN KEY ("folder_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project"
ADD
    CONSTRAINT "project_main_infrastructure_id_a543cde8_fk_infrastructure_id" FOREIGN KEY ("main_infrastructure_id") REFERENCES "infrastructure" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project"
ADD
    CONSTRAINT "project_provider_id_c9e0bf5d_fk_provider_id" FOREIGN KEY ("provider_id") REFERENCES "provider" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "project_code_61e6b1c9_like" ON "project" ("code" varchar_pattern_ops);

CREATE INDEX "project_construction_contract_id_322d4664" ON "project" ("construction_contract_id");

CREATE INDEX "project_creation_user_id_802d4da9" ON "project" ("creation_user_id");

CREATE INDEX "project_financing_fund_id_fc988f79" ON "project" ("financing_fund_id");

CREATE INDEX "project_financing_program_id_167c4fbc" ON "project" ("financing_program_id");

CREATE INDEX "project_folder_id_d180e373" ON "project" ("folder_id");

CREATE INDEX "project_provider_id_c9e0bf5d" ON "project" ("provider_id");

ALTER TABLE
    "project_linked_localities"
ADD
    CONSTRAINT "project_linked_localities_project_id_locality_id_2714cc4e_uniq" UNIQUE ("project_id", "locality_id");

ALTER TABLE
    "project_linked_localities"
ADD
    CONSTRAINT "project_linked_localities_project_id_9e94f903_fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "project_linked_localities"
ADD
    CONSTRAINT "project_linked_localities_locality_id_eebc4c47_fk_locality_code" FOREIGN KEY ("locality_id") REFERENCES "locality" ("code") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "project_linked_localities_project_id_9e94f903" ON "project_linked_localities" ("project_id");

CREATE INDEX "project_linked_localities_locality_id_eebc4c47" ON "project_linked_localities" ("locality_id");

CREATE INDEX "project_linked_localities_locality_id_eebc4c47_like" ON "project_linked_localities" ("locality_id" varchar_pattern_ops);

ALTER TABLE
    "milestone"
ADD
    CONSTRAINT "milestone_parent_id_1f90953d_fk_milestone_id" FOREIGN KEY ("parent_id") REFERENCES "milestone" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "milestone"
ADD
    CONSTRAINT "milestone_project_id_61761d56_fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "milestone_parent_id_1f90953d" ON "milestone" ("parent_id");

CREATE INDEX "milestone_project_id_61761d56" ON "milestone" ("project_id");

CREATE INDEX "infrastructure_locality_id_cf188235" ON "infrastructure" ("locality_id");

CREATE INDEX "infrastructure_locality_id_cf188235_like" ON "infrastructure" ("locality_id" varchar_pattern_ops);

ALTER TABLE
    "contractor_contacts"
ADD
    CONSTRAINT "contractor_contacts_contractor_id_contact_id_27f90927_uniq" UNIQUE ("contractor_id", "contact_id");

ALTER TABLE
    "contractor_contacts"
ADD
    CONSTRAINT "contractor_contacts_contractor_id_7630c780_fk_contractor_id" FOREIGN KEY ("contractor_id") REFERENCES "contractor" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "contractor_contacts"
ADD
    CONSTRAINT "contractor_contacts_contact_id_4247036d_fk_contact_id" FOREIGN KEY ("contact_id") REFERENCES "contact" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "contractor_contacts_contractor_id_7630c780" ON "contractor_contacts" ("contractor_id");

CREATE INDEX "contractor_contacts_contact_id_4247036d" ON "contractor_contacts" ("contact_id");

CREATE INDEX "construction_contract_construction_inspector_id_cec0a020" ON "construction_contract" ("construction_inspector_id");

CREATE INDEX "construction_contract_construction_supervisor_id_d9de0cb4" ON "construction_contract" ("construction_supervisor_id");

CREATE INDEX "construction_contract_contractor_id_64a27f30" ON "construction_contract" ("contractor_id");

CREATE INDEX "construction_contract_creation_user_id_f94ff2cd" ON "construction_contract" ("creation_user_id");

CREATE INDEX "construction_contract_field_manager_id_de254bc0" ON "construction_contract" ("field_manager_id");

CREATE INDEX "construction_contract_social_coordinator_id_3af3f68a" ON "construction_contract" ("social_coordinator_id");

CREATE INDEX "construction_contract_social_inspector_id_e21bc955" ON "construction_contract" ("social_inspector_id");

CREATE INDEX "construction_contract_social_supervisor_id_b6f8c802" ON "construction_contract" ("social_supervisor_id");

INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('documents', 'medianode'),
    ('documents', 'document'),
    ('documents', 'folder'),
    ('monitoring', 'domainentry'),
    ('monitoring', 'department'),
    ('monitoring', 'milestone'),
    ('monitoring', 'locality'),
    ('monitoring', 'financingprogram'),
    ('monitoring', 'project'),
    ('monitoring', 'contact');

INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('monitoring', 'provider'),
    ('monitoring', 'financingfund'),
    ('monitoring', 'infrastructure'),
    ('monitoring', 'district'),
    ('monitoring', 'constructioncontract'),
    ('monitoring', 'contractor');

INSERT INTO
    auth_permission ("name", codename, content_type_id)
VALUES
    (
        'Can add MediaNode',
        'add_medianode',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'medianode'
        )
    ),
    (
        'Can change MediaNode',
        'change_medianode',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'medianode'
        )
    ),
    (
        'Can delete MediaNode',
        'delete_medianode',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'medianode'
        )
    ),
    (
        'Can view MediaNode',
        'view_medianode',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'medianode'
        )
    ),
    (
        'Can add document',
        'add_document',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'document'
        )
    ),
    (
        'Can change document',
        'change_document',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'document'
        )
    ),
    (
        'Can delete document',
        'delete_document',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'document'
        )
    ),
    (
        'Can view document',
        'view_document',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'document'
        )
    ),
    (
        'Can add folder',
        'add_folder',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'folder'
        )
    ),
    (
        'Can change folder',
        'change_folder',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'folder'
        )
    );

INSERT INTO
    auth_permission ("name", codename, content_type_id)
VALUES
    (
        'Can delete folder',
        'delete_folder',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'folder'
        )
    ),
    (
        'Can view folder',
        'view_folder',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'documents'
                AND model = 'folder'
        )
    ),
    (
        'Can add Dominio',
        'add_domainentry',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'domainentry'
        )
    ),
    (
        'Can change Dominio',
        'change_domainentry',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'domainentry'
        )
    ),
    (
        'Can delete Dominio',
        'delete_domainentry',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'domainentry'
        )
    ),
    (
        'Can view Dominio',
        'view_domainentry',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'domainentry'
        )
    ),
    (
        'Can add Departamento',
        'add_department',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'domainentry'
        )
    ),
    (
        'Can change Departamento',
        'change_department',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'department'
        )
    ),
    (
        'Can delete Departamento',
        'delete_department',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'department'
        )
    ),
    (
        'Can view Departamento',
        'view_department',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'department'
        )
    );

INSERT INTO
    auth_permission ("name", codename, content_type_id)
VALUES
    (
        'Can add Hito',
        'add_milestone',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'milestone'
        )
    ),
    (
        'Can change Hito',
        'change_milestone',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'milestone'
        )
    ),
    (
        'Can delete Hito',
        'delete_milestone',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'milestone'
        )
    ),
    (
        'Can view Hito',
        'view_milestone',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'milestone'
        )
    ),
    (
        'Can add Localidad',
        'add_locality',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'locality'
        )
    ),
    (
        'Can change Localidad',
        'change_locality',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'locality'
        )
    ),
    (
        'Can delete Localidad',
        'delete_locality',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'locality'
        )
    ),
    (
        'Can view Localidad',
        'view_locality',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'locality'
        )
    ),
    (
        'Can add Programa de financiación',
        'add_financingprogram',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingprogram'
        )
    ),
    (
        'Can change Programa de financiación',
        'change_financingprogram',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingprogram'
        )
    );

INSERT INTO
    auth_permission ("name", codename, content_type_id)
VALUES
    (
        'Can delete Programa de financiación',
        'delete_financingprogram',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingprogram'
        )
    ),
    (
        'Can view Programa de financiación',
        'view_financingprogram',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingprogram'
        )
    ),
    (
        'Can add Proyecto',
        'add_project',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'project'
        )
    ),
    (
        'Can change Proyecto',
        'change_project',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'project'
        )
    ),
    (
        'Can delete Proyecto',
        'delete_project',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'project'
        )
    ),
    (
        'Can view Proyecto',
        'view_project',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'project'
        )
    ),
    (
        'Can add Contacto',
        'add_contact',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contact'
        )
    ),
    (
        'Can change Contacto',
        'change_contact',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contact'
        )
    ),
    (
        'Can delete Contacto',
        'delete_contact',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contact'
        )
    ),
    (
        'Can view Contacto',
        'view_contact',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contact'
        )
    );

INSERT INTO
    auth_permission ("name", codename, content_type_id)
VALUES
    (
        'Can add Prestador',
        'add_provider',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'provider'
        )
    ),
    (
        'Can change Prestador',
        'change_provider',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'provider'
        )
    ),
    (
        'Can delete Prestador',
        'delete_provider',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'provider'
        )
    ),
    (
        'Can view Prestador',
        'view_provider',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'provider'
        )
    ),
    (
        'Can add Financiador',
        'add_financingfund',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingfund'
        )
    ),
    (
        'Can change Financiador',
        'change_financingfund',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingfund'
        )
    ),
    (
        'Can delete Financiador',
        'delete_financingfund',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingfund'
        )
    ),
    (
        'Can view Financiador',
        'view_financingfund',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'financingfund'
        )
    ),
    (
        'Can add Infraestructura',
        'add_infrastructure',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'infrastructure'
        )
    ),
    (
        'Can change Infraestructura',
        'change_infrastructure',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'infrastructure'
        )
    );

INSERT INTO
    auth_permission ("name", codename, content_type_id)
VALUES
    (
        'Can delete Infraestructura',
        'delete_infrastructure',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'infrastructure'
        )
    ),
    (
        'Can view Infraestructura',
        'view_infrastructure',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'infrastructure'
        )
    ),
    (
        'Can add Distrito',
        'add_district',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'district'
        )
    ),
    (
        'Can change Distrito',
        'change_district',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'district'
        )
    ),
    (
        'Can delete Distrito',
        'delete_district',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'district'
        )
    ),
    (
        'Can view Distrito',
        'view_district',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'district'
        )
    ),
    (
        'Can add Contrato de obras',
        'add_constructioncontract',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'constructioncontract'
        )
    ),
    (
        'Can change Contrato de obras',
        'change_constructioncontract',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'constructioncontract'
        )
    ),
    (
        'Can delete Contrato de obras',
        'delete_constructioncontract',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'constructioncontract'
        )
    ),
    (
        'Can view Contrato de obras',
        'view_constructioncontract',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'constructioncontract'
        )
    );

INSERT INTO
    auth_permission ("name", codename, content_type_id)
VALUES
    (
        'Can add Contratista',
        'add_contractor',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contractor'
        )
    ),
    (
        'Can change Contratista',
        'change_contractor',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contractor'
        )
    ),
    (
        'Can delete Contratista',
        'delete_contractor',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contractor'
        )
    ),
    (
        'Can view Contratista',
        'view_contractor',
        (
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'monitoring'
                AND model = 'contractor'
        )
    );

COMMIT;
