-- Deploy sepraps:create_tables_project_components to pg

BEGIN;

--
-- Create model BuildingComponent
--
CREATE TABLE "building_component" ("id" integer NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "created_at" timestamp with time zone NULL, "updated_at" timestamp with time zone NULL, "active" boolean NOT NULL, "code" varchar(50) NOT NULL, "name" varchar(255) NOT NULL, "properties" jsonb NULL, "created_by_id" bigint NOT NULL, "updated_by_id" bigint NOT NULL);
--
-- Create model SocialComponentMonitoring
--
CREATE TABLE "social_component_monitoring" ("id" integer NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "created_at" timestamp with time zone NULL, "updated_at" timestamp with time zone NULL, "active" boolean NOT NULL, "code" varchar(50) NOT NULL, "name" varchar(255) NOT NULL, "execution_status" varchar(20) NULL, "quality_status" varchar(20) NULL, "expected_end_date" date NULL, "real_end_date" date NULL, "progress_percentage" numeric(5, 2) NULL, "created_by_id" bigint NOT NULL, "featured_document_id" integer NULL, "featured_image_id" integer NULL, "folder_id" integer NULL);
CREATE TABLE "social_component_monitoring_comments" ("id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "socialcomponentmonitoring_id" integer NOT NULL, "comment_id" integer NOT NULL);

--
-- Create model SocialComponentTraining
--
CREATE TABLE "social_component_training" ("id" integer NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "created_at" timestamp with time zone NULL, "updated_at" timestamp with time zone NULL, "active" boolean NOT NULL, "start_date" date NULL, "end_date" date NULL, "target_population" varchar(50)[] NULL, "method" varchar(50) NULL, "number_of_women" integer NULL, "number_of_men" integer NULL, "number_of_hours" integer NULL, "number_of_digital_materials" integer NULL, "number_of_printed_materials" integer NULL, "contract_id" integer NULL, "contractor_id" integer NULL, "created_by_id" bigint NOT NULL, "featured_document_id" integer NULL, "featured_image_id" integer NULL, "folder_id" integer NULL, "social_component_monitoring_id" integer NOT NULL, "updated_by_id" bigint NOT NULL);
--
-- Add field project to socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" ADD COLUMN "project_id" integer NOT NULL CONSTRAINT "social_component_monitoring_project_id_a6324934_fk_project_id" REFERENCES "project"("id") DEFERRABLE INITIALLY DEFERRED; SET CONSTRAINTS "social_component_monitoring_project_id_a6324934_fk_project_id" IMMEDIATE;
--
-- Add field updated_by to socialcomponentmonitoring
--
ALTER TABLE "social_component_monitoring" ADD COLUMN "updated_by_id" bigint NOT NULL CONSTRAINT "social_component_mon_updated_by_id_1a95212f_fk_users_use" REFERENCES "users_user"("id") DEFERRABLE INITIALLY DEFERRED; SET CONSTRAINTS "social_component_mon_updated_by_id_1a95212f_fk_users_use" IMMEDIATE;

--
-- Create model BuildingComponentValue
--
CREATE TABLE "building_component_value" ("id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "code" varchar(50) NOT NULL, "value" text NULL, "building_component_id" integer NULL);
--
-- Create model BuildingComponentMonitoring
--
CREATE TABLE "building_component_monitoring" ("id" integer NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "created_at" timestamp with time zone NULL, "updated_at" timestamp with time zone NULL, "active" boolean NOT NULL, "execution_status" varchar(20) NULL, "quality_status" varchar(20) NULL, "expected_amount" numeric(20, 2) NULL, "expected_end_date" date NULL, "paid_amount" numeric(20, 2) NULL, "pending_amount" numeric(20, 2) NULL, "real_end_date" date NULL, "physical_progress_percentage" numeric(5, 2) NULL, "building_component_id" integer NOT NULL, "created_by_id" bigint NOT NULL, "featured_document_id" integer NULL, "featured_image_id" integer NULL, "folder_id" integer NULL, "project_id" integer NOT NULL, "updated_by_id" bigint NOT NULL);
CREATE TABLE "building_component_monitoring_comments" ("id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "buildingcomponentmonitoring_id" integer NOT NULL, "comment_id" integer NOT NULL);
--
-- Add field projects to constructioncontract
--
-- (no-op)
ALTER TABLE "building_component" ADD CONSTRAINT "building_component_created_by_id_4e100bae_fk_users_user_id" FOREIGN KEY ("created_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component" ADD CONSTRAINT "building_component_updated_by_id_5f7bd2e1_fk_users_user_id" FOREIGN KEY ("updated_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "building_component_created_by_id_4e100bae" ON "building_component" ("created_by_id");
CREATE INDEX "building_component_updated_by_id_5f7bd2e1" ON "building_component" ("updated_by_id");
ALTER TABLE "social_component_monitoring" ADD CONSTRAINT "social_component_mon_created_by_id_350d079a_fk_users_use" FOREIGN KEY ("created_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_monitoring" ADD CONSTRAINT "social_component_mon_featured_document_id_79bb7c9f_fk_media_nod" FOREIGN KEY ("featured_document_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_monitoring" ADD CONSTRAINT "social_component_mon_featured_image_id_0a1ead3b_fk_media_nod" FOREIGN KEY ("featured_image_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_monitoring" ADD CONSTRAINT "social_component_monitoring_folder_id_fba817d7_fk_media_node_id" FOREIGN KEY ("folder_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "social_component_monitoring_created_by_id_350d079a" ON "social_component_monitoring" ("created_by_id");
CREATE INDEX "social_component_monitoring_featured_document_id_79bb7c9f" ON "social_component_monitoring" ("featured_document_id");
CREATE INDEX "social_component_monitoring_featured_image_id_0a1ead3b" ON "social_component_monitoring" ("featured_image_id");
CREATE INDEX "social_component_monitoring_folder_id_fba817d7" ON "social_component_monitoring" ("folder_id");
ALTER TABLE "social_component_monitoring_comments" ADD CONSTRAINT "social_component_monitor_socialcomponentmonitorin_4a05fbd0_uniq" UNIQUE ("socialcomponentmonitoring_id", "comment_id");
ALTER TABLE "social_component_monitoring_comments" ADD CONSTRAINT "social_component_mon_socialcomponentmonit_82950e79_fk_social_co" FOREIGN KEY ("socialcomponentmonitoring_id") REFERENCES "social_component_monitoring" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_monitoring_comments" ADD CONSTRAINT "social_component_mon_comment_id_efcfe8d9_fk_comment_i" FOREIGN KEY ("comment_id") REFERENCES "comment" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "social_component_monitorin_socialcomponentmonitoring__82950e79" ON "social_component_monitoring_comments" ("socialcomponentmonitoring_id");
CREATE INDEX "social_component_monitoring_comments_comment_id_efcfe8d9" ON "social_component_monitoring_comments" ("comment_id");
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_tra_contract_id_473dca39_fk_construct" FOREIGN KEY ("contract_id") REFERENCES "construction_contract" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_tra_contractor_id_55ffaa39_fk_contracto" FOREIGN KEY ("contractor_id") REFERENCES "contractor" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_tra_created_by_id_36c7235a_fk_users_use" FOREIGN KEY ("created_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_tra_featured_document_id_33579f85_fk_media_nod" FOREIGN KEY ("featured_document_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_tra_featured_image_id_d3bd6746_fk_media_nod" FOREIGN KEY ("featured_image_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_training_folder_id_7dbc2170_fk_media_node_id" FOREIGN KEY ("folder_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_tra_social_component_mon_f15408ba_fk_social_co" FOREIGN KEY ("social_component_monitoring_id") REFERENCES "social_component_monitoring" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "social_component_training" ADD CONSTRAINT "social_component_tra_updated_by_id_e33b110a_fk_users_use" FOREIGN KEY ("updated_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "social_component_training_contract_id_473dca39" ON "social_component_training" ("contract_id");
CREATE INDEX "social_component_training_contractor_id_55ffaa39" ON "social_component_training" ("contractor_id");
CREATE INDEX "social_component_training_created_by_id_36c7235a" ON "social_component_training" ("created_by_id");
CREATE INDEX "social_component_training_featured_document_id_33579f85" ON "social_component_training" ("featured_document_id");
CREATE INDEX "social_component_training_featured_image_id_d3bd6746" ON "social_component_training" ("featured_image_id");
CREATE INDEX "social_component_training_folder_id_7dbc2170" ON "social_component_training" ("folder_id");
CREATE INDEX "social_component_training_social_component_monitorin_f15408ba" ON "social_component_training" ("social_component_monitoring_id");
CREATE INDEX "social_component_training_updated_by_id_e33b110a" ON "social_component_training" ("updated_by_id");
CREATE INDEX "social_component_monitoring_project_id_a6324934" ON "social_component_monitoring" ("project_id");
CREATE INDEX "social_component_monitoring_updated_by_id_1a95212f" ON "social_component_monitoring" ("updated_by_id");
ALTER TABLE "building_component_value" ADD CONSTRAINT "building_component_v_building_component_i_6e315108_fk_building_" FOREIGN KEY ("building_component_id") REFERENCES "building_component" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "building_component_value_building_component_id_6e315108" ON "building_component_value" ("building_component_id");
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_building_component_i_862db2dc_fk_building_" FOREIGN KEY ("building_component_id") REFERENCES "building_component" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_created_by_id_8d004efe_fk_users_use" FOREIGN KEY ("created_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_featured_document_id_389528f2_fk_media_nod" FOREIGN KEY ("featured_document_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_featured_image_id_303e86c1_fk_media_nod" FOREIGN KEY ("featured_image_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_folder_id_17655989_fk_media_nod" FOREIGN KEY ("folder_id") REFERENCES "media_node" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_monitoring_project_id_fb052a07_fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_updated_by_id_0ffe187e_fk_users_use" FOREIGN KEY ("updated_by_id") REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "building_component_monitoring_building_component_id_862db2dc" ON "building_component_monitoring" ("building_component_id");
CREATE INDEX "building_component_monitoring_created_by_id_8d004efe" ON "building_component_monitoring" ("created_by_id");
CREATE INDEX "building_component_monitoring_featured_document_id_389528f2" ON "building_component_monitoring" ("featured_document_id");
CREATE INDEX "building_component_monitoring_featured_image_id_303e86c1" ON "building_component_monitoring" ("featured_image_id");
CREATE INDEX "building_component_monitoring_folder_id_17655989" ON "building_component_monitoring" ("folder_id");
CREATE INDEX "building_component_monitoring_project_id_fb052a07" ON "building_component_monitoring" ("project_id");
CREATE INDEX "building_component_monitoring_updated_by_id_0ffe187e" ON "building_component_monitoring" ("updated_by_id");
ALTER TABLE "building_component_monitoring_comments" ADD CONSTRAINT "building_component_monit_buildingcomponentmonitor_c8993b10_uniq" UNIQUE ("buildingcomponentmonitoring_id", "comment_id");
ALTER TABLE "building_component_monitoring_comments" ADD CONSTRAINT "building_component_m_buildingcomponentmon_4fdc3548_fk_building_" FOREIGN KEY ("buildingcomponentmonitoring_id") REFERENCES "building_component_monitoring" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_monitoring_comments" ADD CONSTRAINT "building_component_m_comment_id_ff974998_fk_comment_i" FOREIGN KEY ("comment_id") REFERENCES "comment" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "building_component_monitor_buildingcomponentmonitorin_4fdc3548" ON "building_component_monitoring_comments" ("buildingcomponentmonitoring_id");
CREATE INDEX "building_component_monitoring_comments_comment_id_ff974998" ON "building_component_monitoring_comments" ("comment_id");

--
-- Create model ContractProject
--
CREATE TABLE "contract_project" ("id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, "construction" boolean NOT NULL, "contract_id" integer NOT NULL, "project_id" integer NOT NULL);

ALTER TABLE "contract_project" ADD CONSTRAINT "contract_project_contract_id_e1d9f018_fk_construct" FOREIGN KEY ("contract_id") REFERENCES "construction_contract" ("id") DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "contract_project" ADD CONSTRAINT "contract_project_project_id_c85c632f_fk_project_id" FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "contract_project_contract_id_e1d9f018" ON "contract_project" ("contract_id");
CREATE INDEX "contract_project_project_id_c85c632f" ON "contract_project" ("project_id");

INSERT INTO contract_project
(contract_id, project_id, construction)
SELECT
	p.construction_contract_id,
	p.id,
    true
FROM project p
WHERE p.construction_contract_id is not null;

-- Remove field construction_contract from project
--
SET CONSTRAINTS "project_construction_contrac_322d4664_fk_construct" IMMEDIATE; ALTER TABLE "project" DROP CONSTRAINT "project_construction_contrac_322d4664_fk_construct";
ALTER TABLE "project" DROP COLUMN "construction_contract_id" CASCADE;


-- Create defaults config for components

ALTER TABLE building_component ADD COLUMN project_id_aux integer NULL;

INSERT INTO building_component
(code, "name", properties, created_by_id, updated_by_id, created_at, updated_at, active, project_id_aux)
SELECT
	unnest(array[
		'tanque',
		'fuente_provision',
		'equipamiento_electromecanico',
		'casetas_operaciones',
		'extension_linea_electrica',
		'red_distribucion_conexiones',
		'cercado_perimetral'
	]),
	unnest(array[
		'Tanque elevado',
		'Fuente de provisión',
		'Equipamiento electromecánico e hidráulico',
		'Casetas de operaciones',
		'Extensión de línea eléctrica',
		'Red de distribución, conexiones domiciliarias, aductora e hidrómetros',
		'Cercado perimetral'
	]),
	unnest(array[
		'{"altura": {"type": "integer", "unit": "m", "label": "Altura"}, "capacidad": {"type": "decimal", "unit": "m³", "label": "Capacidad"}}',
		'{"caudal": {"type": "decimal", "unit": "m³/s", "label": "Caudal"}, "diametro": {"type": "decimal", "unit": "cm", "label": "Diámetro"}, "profundidad": {"type": "decimal", "unit": "m", "label": "Altura"}, "informe_perforacion": {"type": "domain", "label": "Informe de perforación", "domain": "yesNoDomain"}, "analisis_calidad_agua": {"type": "domain", "label": "Análisis de calidad de agua", "domain": "yesNoDomain"}, "estudio_hidrogeologico": {"type": "domain", "label": "Estudio hidrogeológico", "domain": "yesNoDomain"}, "prueba_bombeo_y_perfilaje": {"type": "domain", "label": "Prueba de bombeo y perfilaje eléctrico", "domain": "yesNoDomain"}}',
		'{"potencia": {"type": "decimal", "unit": "HP", "label": "Potencia"}, "caudal_operacion": {"type": "decimal", "unit": "m³/s", "label": "Caudal de operación"}, "profundidad_instalacion": {"type": "decimal", "unit": "m", "label": "Profundidad de instalación"}}',
		'{"obras_civiles": {"type": "domain", "label": "Obras civiles", "domain": "yesNoDomain"}, "croquis_ubicacion": {"type": "domain", "label": "Croquis de ubicación", "domain": "yesNoDomain"}, "aprobacion_municipal": {"type": "domain", "label": "Aprobación municipal", "domain": "yesNoDomain"}, "instalacion_electrica": {"type": "domain", "label": "Instalación eléctrica", "domain": "yesNoDomain"}}',
		'{"longitud": {"type": "decimal", "unit": "m", "label": "Longitud"}, "transformador": {"type": "domain", "label": "Transformador", "domain": "yesNoDomain"}, "extension_linea": {"type": "domain", "label": "Extensión de línea", "domain": "yesNoDomain"}, "consulta_previa_ANDE": {"type": "domain", "label": "Consulta previa a la ANDE", "domain": "yesNoDomain"}, "potencia_transformador": {"type": "decimal", "unit": "HP", "label": "Potencia de transformador"}}',
		'{"aductora": {"type": "domain", "label": "Aductora", "domain": "yesNoDomain"}, "red_distribucion": {"type": "domain", "label": "Red de distribución", "domain": "yesNoDomain"}, "longitud_aductora": {"type": "decimal", "unit": "m", "label": "Longitud de aductora"}, "cantidad_medidores": {"type": "integer", "label": "Cantidad de medidores"}, "conexiones_domiciliarias": {"type": "domain", "label": "Conexiones domiciliarias", "domain": "yesNoDomain"}, "cantidad_conexiones_domiciliarias": {"type": "integer", "label": "Cantidad de conexiones domiciliarias"}}',
		'{"postes": {"type": "domain", "label": "Postes", "domain": "yesNoDomain"}, "predio": {"type": "text", "label": "Predio"}, "portones": {"type": "domain", "label": "Portones", "domain": "yesNoDomain"}, "dimensiones": {"type": "text", "label": "Dimensiones"}, "tejidos_alambre": {"type": "domain", "label": "Tejidos de alambre", "domain": "yesNoDomain"}}'
	]::jsonb[]),
	1,1,now(),now(),true,
	p.id
FROM project p
WHERE p.project_type = 'agua';


INSERT INTO building_component
(code, "name", properties, created_by_id, updated_by_id, created_at, updated_at, active, project_id_aux)
SELECT
	unnest(array[
		'planta_tratamiento',
		'redes_conexiones',
		'estaciones_bombeo',
		'mejoramiento_agua'
	]),
	unnest(array[
		'Planta de tratamiento',
		'Redes básicas, condominales y conexiones',
		'Estaciones de bombeo',
		'Mejoramiento de agua'
	]),
	unnest(array[
		'{"empastado": {"type": "domain", "label": "Empastado", "domain": "yesNoDomain"}, "desarenador": {"type": "domain", "label": "Desarenador", "domain": "yesNoDomain"}, "lecho_secado": {"type": "domain", "label": "Lecho de secado", "domain": "yesNoDomain"}, "instalacion_membranas": {"type": "domain", "label": "Instalación de membranas", "domain": "yesNoDomain"}, "avance_movimiento_suelo": {"type": "domain", "label": "Avance movimiento de suelo", "domain": "yesNoDomain"}, "construccion_interconexiones": {"type": "domain", "label": "Construcción de interconexiones", "domain": "yesNoDomain"}}',
		'{"canerias_red_basica_instaladas": {"type": "integer", "label": "Cañerías instaladas (red básica)"}, "canerias_red_condominal_instaladas": {"type": "integer", "label": "Cañerías instaladas (red condominal)"}, "conexiones_domiciliarias_instaladas": {"type": "integer", "label": "Conexiones domiciliarias instaladas"}}',
		'{"obras_civiles": {"type": "domain", "label": "Obras civiles", "domain": "yesNoDomain"}, "cantidad_bombas": {"type": "integer", "label": "Cantidad de bombas"}, "linea_impulsion": {"type": "domain", "label": "Línea de impulsión", "domain": "yesNoDomain"}, "potencia_bombas": {"type": "decimal", "unit": "HP", "label": "Potencia de bombas"}, "capacidad_bombas": {"type": "decimal", "unit": "m³/s", "label": "Capacidad de bombas"}, "permiso_municipal": {"type": "domain", "label": "Permiso municipal", "domain": "yesNoDomain"}, "casetas_operaciones": {"type": "domain", "label": "Casetas de operaciones", "domain": "yesNoDomain"}, "extension_linea_electrica": {"type": "domain", "label": "Extensión de línea eléctrica", "domain": "yesNoDomain"}, "longitud_caneria_impulsion": {"type": "decimal", "unit": "m", "label": "Longitud de cañería de impulsión"}, "instalaciones_electromecanicas": {"type": "domain", "label": "Instalaciones electromecánicas", "domain": "yesNoDomain"}}',
		'{"tanque_elevado": {"type": "domain", "label": "Tanque elevado", "domain": "yesNoDomain"}, "fuente_provision": {"type": "domain", "label": "Fuente de provisión", "domain": "yesNoDomain"}, "red_distribucion": {"type": "domain", "label": "Red de distribución", "domain": "yesNoDomain"}, "cercado_perimetral": {"type": "domain", "label": "Cercado perimetral", "domain": "yesNoDomain"}, "casetas_operaciones": {"type": "domain", "label": "Casetas de operaciones", "domain": "yesNoDomain"}, "extension_linea_electrica": {"type": "domain", "label": "Extensión de línea eléctrica", "domain": "yesNoDomain"}, "instalaciones_electromecanicas": {"type": "domain", "label": "Instalaciones electromecánicas", "domain": "yesNoDomain"}}'
	]::jsonb[]),
	1,1,now(),now(),true,
	p.id
FROM project p
WHERE p.project_type = 'alcantarillado';

INSERT INTO building_component
(code, "name", properties, created_by_id, updated_by_id, created_at, updated_at, active, project_id_aux)
SELECT
	unnest(array[
		'banos',
		'letrinas'
	]),
	unnest(array[
		'Baños',
		'Letrinas'
	]),
	unnest(array[
		'{"avance": {"type": "domain", "label": "Avance", "domain": "phasesDomain"}, "cantidad": {"type": "integer", "label": "Cantidad"}}',
		'{"entrega": {"type": "domain", "label": "Entrega", "domain": "yesNoDomain"}, "cantidad": {"type": "integer", "label": "Cantidad"}, "provision": {"type": "domain", "label": "Provisión", "domain": "yesNoDomain"}, "instalacion": {"type": "domain", "label": "Instalación", "domain": "yesNoDomain"}, "sistema_disposicion": {"type": "domain", "label": "Sistema de disposición", "domain": "yesNoDomain"}}'
	]::jsonb[]),
	1,1,now(),now(),true,
	p.id
FROM project p
WHERE p.project_type = 'sanitarios';

INSERT INTO building_component_monitoring
	(building_component_id,project_id,created_by_id,updated_by_id,created_at,updated_at,active)
SELECT
	bc.id,
	bc.project_id_aux,
	1,1,now(),now(),true
FROM building_component bc;


INSERT INTO public.media_node
(media_type, media_name, storage_path, created_at, creation_user_id)
SELECT
	'FOLDER',
	'BuildingComponentMonitoring_' || bcm.id,
	'buildingcomponentmonitoring/' || bcm.id,
	now(),
	1
FROM building_component_monitoring bcm;

UPDATE building_component_monitoring bcm
SET folder_id = mn.id
FROM media_node mn where mn.storage_path = 'buildingcomponentmonitoring/' || bcm.id;



INSERT INTO social_component_monitoring
(code, "name", project_id, created_by_id, updated_by_id, created_at, updated_at, active)
SELECT
	unnest(array[
		'tendido_red',
		'temas_significativos',
		'operacion_mantenimiento',
		'prestador_servicio',
		'sistemas_abastecimiento',
		'micromedicion_registro_tarifas',
		'adecuacion_intradomiciliaria_abastecimientos',
		'cloracion',
		'mejora_calidad_agua',
		'jornadas_intercambio_prestadores'
	]),
	unnest(array[
		'Asistencia técnica y capacitación en excavación y tendido de red',
		'Sensibilización para el cambio de comportamiento en temas significativos',
		'Capacitación en operación y mantenimiento del sistema de abastecimiento de agua',
		'Capacitación y administración de la organización como prestador de servicio',
		'Capacitación en administración y gestión de sistemas de abastecimiento de agua',
		'Capacitación y asistencia técnica en micromedición, registro y tarifas de agua',
		'Capacitación y asistencia técnica y social para adecuación intradomiciliaria de abastecimientos de agua',
		'Capacitación y asistencia técnica en cloración del agua',
		'Servicio de capacitación y provisión de productos para mejorar la calidad del agua de los sistemas de abastecimiento',
		'Jornadas de Intercambio de experiencia técnica entre prestadores'
	]),
	p.id,
	1,1,now(),now(),true
FROM project p
WHERE p.project_type = 'agua';

INSERT INTO social_component_monitoring
(code, "name", project_id, created_by_id, updated_by_id, created_at, updated_at, active)
SELECT
	unnest(array[
		'alcantarillado_sanitario',
		'operacion_mantenimiento_alcantarillado',
		'adecuacion_intradomiciliaria_alcantarillado'
	]),
	unnest(array[
		'Capacitación en administración y gestión del sistema de alcantarillado sanitario',
		'Capacitación en operación y mantenimiento del sistema de alcantarillado sanitario',
		'Capacitación y asistencia técnica y social para adecuación intradomiciliaria de alcantarillado sanitario'
	]),
	p.id,
	1,1,now(),now(),true
FROM project p
WHERE p.project_type = 'alcantarillado';

INSERT INTO social_component_monitoring
(code, "name", project_id, created_by_id, updated_by_id, created_at, updated_at, active)
SELECT
	unnest(array[
		'mantenimiento_banos'
	]),
	unnest(array[
		'Asistencia técnica y capacitación en mantenimiento de baños'
	]),
	p.id,
	1,1,now(),now(),true
FROM project p
WHERE p.project_type = 'sanitarios';


INSERT INTO public.media_node
(media_type, media_name, storage_path, created_at, creation_user_id)
SELECT
	'FOLDER',
	'SocialComponentMonitoring_' || scm.id,
	'socialcomponentmonitoring/' || scm.id,
	now(),
	1
FROM social_component_monitoring scm;

UPDATE social_component_monitoring scm
SET folder_id = mn.id
FROM media_node mn where mn.storage_path = 'socialcomponentmonitoring/' || scm.id;

-- Create permissions

INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'buildingcomponent'),
    ('app', 'buildingcomponentvalue'),
    ('app', 'buildingcomponentmonitoring');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Componente de construcción','add_buildingcomponent',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponent'
        )),
	 ('Can change Componente de construcción','change_buildingcomponent',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponent'
        )),
	 ('Can delete Componente de construcción','delete_buildingcomponent',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponent'
        )),
	 ('Can view Componente de construcción','view_buildingcomponent',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponent'
        ));

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add building component value','add_buildingcomponentvalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentvalue'
        )),
	 ('Can change building component value','change_buildingcomponentvalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentvalue'
        )),
	 ('Can delete building component value','delete_buildingcomponentvalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentvalue'
        )),
	 ('Can view building component value','view_buildingcomponentvalue',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentvalue'
        ));

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Seguimiento de componente de construcción','add_buildingcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentmonitoring'
        )),
	 ('Can change Seguimiento de componente de construcción','change_buildingcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentmonitoring'
        )),
	 ('Can delete Seguimiento de componente de construcción','delete_buildingcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentmonitoring'
        )),
	 ('Can view Seguimiento de componente de construcción','view_buildingcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'buildingcomponentmonitoring'
        ));

INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_buildingcomponentmonitoring')
select t1.id, t2.id
from t1,t2;

INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_buildingcomponentvalue')
select t1.id, t2.id
from t1,t2;

INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_buildingcomponent')
select t1.id, t2.id
from t1,t2;

INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'socialcomponenttraining'),
    ('app', 'socialcomponentmonitoring');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Formación de componente social','add_socialcomponenttraining',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponenttraining'
        )),
	 ('Can change Formación de componente social','change_socialcomponenttraining',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponenttraining'
        )),
	 ('Can delete Formación de componente social','delete_socialcomponenttraining',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponenttraining'
        )),
	 ('Can view Formación de componente social','view_socialcomponenttraining',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponenttraining'
        ));


INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add Seguimiento de componente social','add_socialcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponentmonitoring'
        )),
	 ('Can change Seguimiento de componente social','change_socialcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponentmonitoring'
        )),
	 ('Can delete Seguimiento de componente social','delete_socialcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponentmonitoring'
        )),
	 ('Can view Seguimiento de componente social','view_socialcomponentmonitoring',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'socialcomponentmonitoring'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_socialcomponenttraining')
select t1.id, t2.id
from t1,t2;

INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_socialcomponentmonitoring')
select t1.id, t2.id
from t1,t2;

INSERT INTO
    public.django_content_type (app_label, model)
VALUES
    ('app', 'contractproject');

INSERT INTO public.auth_permission ("name",codename,content_type_id) VALUES
	 ('Can add contract project','add_contractproject',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractproject'
        )),
	 ('Can change contract project','change_contractproject',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractproject'
        )),
	 ('Can delete contract project','delete_contractproject',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractproject'
        )),
	 ('Can view contract project','view_contractproject',(
            SELECT
                id
            FROM
                django_content_type
            where
                app_label = 'app'
                AND model = 'contractproject'
        ));


INSERT INTO auth_group_permissions (group_id, permission_id)
WITH
	t1 AS (select id from auth_group g where g."name" in ('edicion', 'gestion', 'supervision')),
	t2 AS (select id from auth_permission p where p.codename like '%_contractproject')
select t1.id, t2.id
from t1,t2;


COMMIT;
