-- Deploy sepraps:update_tables_dynamic_fields to pg

BEGIN;

-- Alter field building_component on buildingcomponentvalue set relationship with cascade delete
--
SET CONSTRAINTS "building_component_m_building_component_i_862db2dc_fk_building_" IMMEDIATE;
SET CONSTRAINTS "building_component_v_building_component_i_6e315108_fk_building_" IMMEDIATE;
ALTER TABLE "building_component_monitoring" DROP CONSTRAINT "building_component_m_building_component_i_862db2dc_fk_building_";
ALTER TABLE "building_component_value" DROP CONSTRAINT "building_component_v_building_component_i_6e315108_fk_building_";
ALTER TABLE "building_component_value" ALTER COLUMN "building_component_id" SET DEFAULT 1;
UPDATE "building_component_value" SET "building_component_id" = 1 WHERE "building_component_id" IS NULL;
SET CONSTRAINTS ALL IMMEDIATE;
ALTER TABLE "building_component_monitoring" ADD CONSTRAINT "building_component_m_building_component_i_862db2dc_fk_building_" FOREIGN KEY ("building_component_id") REFERENCES "building_component" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_value" ALTER COLUMN "building_component_id" SET NOT NULL;
ALTER TABLE "building_component_value" ADD CONSTRAINT "building_component_v_building_component_i_6e315108_fk_building_" FOREIGN KEY ("building_component_id") REFERENCES "building_component" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "building_component_value" ALTER COLUMN "building_component_id" DROP DEFAULT;

--
-- Remove field properties from buildingcomponent
--
ALTER TABLE "building_component" DROP COLUMN "properties" CASCADE;
--
-- Add field code_label to buildingcomponent
--
ALTER TABLE "building_component" ADD COLUMN "code_label" varchar(255) DEFAULT '' NOT NULL;
ALTER TABLE "building_component" ALTER COLUMN "code_label" DROP DEFAULT;

--
-- Add field technical_properties to buildingcomponent
--
ALTER TABLE "building_component" ADD COLUMN "technical_properties" jsonb NULL;
--
-- Add field validation_properties to buildingcomponent
--
ALTER TABLE "building_component" ADD COLUMN "validation_properties" jsonb NULL;
--
-- Add field labels to contractservice
--
ALTER TABLE "contract_service" ADD COLUMN "labels" jsonb NULL;

-- Update all building components

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"tipo": {"type": "domain", "label": "Tipo", "domain": "tankType"}, "capacidad": {"type": "decimal", "unit": "m3", "label": "Capacidad"}, "coordenada_x": {"type": "integer", "label": "Coordenada X"}, "coordenada_y": {"type": "integer", "label": "Coordenada Y"}}',
	validation_properties = '{"montaje": {"type": "domain", "label": "Estructura / Montaje", "domain": "yesNoDomain"}, "fundacion": {"type": "domain", "label": "Cálculo y ejecución de fundación", "domain": "yesNoDomain"}, "estudio_suelo": {"type": "domain", "label": "Estudio del suelo", "domain": "yesNoDomain"}, "pararayos_otros": {"type": "domain", "label": "Pararrayos y sistema de puesta a tierra instalado", "domain": "yesNoDomain"}, "instalaciones_hidraulicas": {"type": "domain", "label": "Instalaciones hidráulicas", "domain": "yesNoDomain"}}'
WHERE
    code = 'tanque';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"caudal": {"type": "decimal", "unit": "m3/h", "label": "Caudal"}, "diametro": {"type": "decimal", "unit": "pulgadas", "label": "Diámetro"}, "profundidad": {"type": "decimal", "unit": "m", "label": "Profundidad"}, "coordenada_x": {"type": "integer", "label": "Coordenada X"}, "coordenada_y": {"type": "integer", "label": "Coordenada Y"}}',
	validation_properties = '{"analisis_agua": {"type": "domain", "label": "Análisis de calidad del agua", "domain": "yesNoDomain"}, "prueba_bombeo": {"type": "domain", "label": "Prueba de bombeo", "domain": "yesNoDomain"}, "informe_perforacion": {"type": "domain", "label": "Informe de perforación", "domain": "yesNoDomain"}, "perfilaje_electrico": {"type": "domain", "label": "Perfilaje eléctrico", "domain": "yesNoDomain"}, "estudio_hidrogeologico": {"type": "domain", "label": "Estudio hidrogeológico", "domain": "yesNoDomain"}}'
WHERE
    code = 'fuente_provision';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"potencia": {"type": "decimal", "unit": "HP", "label": "Potencia"}, "tipo_energia": {"type": "domain", "label": "Tipo de energía", "domain": "energyType"}, "tipo_canheria": {"type": "domain", "label": "Tipo de cañería", "domain": "pipeType"}, "caudal_operacion": {"type": "decimal", "unit": "m3/h", "label": "Caudal de operación"}, "profundidad_instalacion": {"type": "decimal", "unit": "m", "label": "Profundidad de la instalación"}}',
	validation_properties = '{"automatizacion": {"type": "domain", "label": "Automatización realizada", "domain": "yesNoDomain"}, "instalacion_bomba_cloro": {"type": "domain", "label": "Provisión e instalación de bomba dosificadora de cloro", "domain": "yesNoDomain"}, "instalacion_electrobomba": {"type": "domain", "label": "Provisión e instalación de electrobomba", "domain": "yesNoDomain"}}'
WHERE
    code = 'equipamiento_electromecanico';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"tipo_caseta": {"type": "domain", "label": "Tipo de caseta", "domain": "boothType"}, "material_caseta": {"type": "domain", "label": "Material de la caseta", "domain": "boothMaterialType"}}',
	validation_properties = '{"croquis": {"type": "domain", "label": "Croquis de ubicación", "domain": "yesNoDomain"}, "obras_civiles": {"type": "domain", "label": "Obras civiles realizadas", "domain": "yesNoDomain"}, "aprobacion_municipal": {"type": "domain", "label": "Aprobación municipal", "domain": "yesNoDomain"}, "instalacion_electrica": {"type": "domain", "label": "Intalación eléctrica", "domain": "yesNoDomain"}}'
WHERE
    code = 'casetas_operaciones';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"longitud": {"type": "integer", "unit": "m", "label": "Longitud"}, "tipo_energia": {"type": "domain", "label": "Tipo de energía", "domain": "energyType"}, "potencia_transformador": {"type": "decimal", "unit": "KVA", "label": "Potencia del transformador"}}',
	validation_properties = '{"medidor_ande": {"type": "domain", "label": "Medidor de ANDE", "domain": "yesNoDomain"}, "consulta_ande": {"type": "domain", "label": "Consulta previa a la ANDE", "domain": "yesNoDomain"}, "transformador": {"type": "domain", "label": "Transformador instalado", "domain": "yesNoDomain"}, "extension_linea": {"type": "domain", "label": "Extensión de línea realizada", "domain": "yesNoDomain"}}'
WHERE
    code = 'extension_linea_electrica';

UPDATE building_component SET
    code = 'red_conexiones_aductora_e_hidrometros',
	code_label = 'Red, conexiones, aductora e hidrómetros',
	"name" = 'Red, conexiones, aductora e hidrómetros',
	technical_properties = '{"n_medidores": {"type": "integer", "label": "Cantidad de medidores"}, "tipo_canheria": {"type": "domain", "label": "Tipo de cañería", "domain": "pipeType"}, "longitud_aduptora": {"type": "decimal", "unit": "m", "label": "Longitud de aduptora"}}',
	validation_properties = '{"conexiones": {"type": "integer", "label": "Número de conexiones"}, "n_aductora": {"type": "integer", "label": "Número de aductoras instaladas"}, "n_hidrometro": {"type": "integer", "label": "Número de hidrómetros instalados"}, "red_distribucion": {"type": "integer", "unit": "m", "label": "Metros de red de distribución instalada"}}'
WHERE
    code = 'red_distribucion_conexiones';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"predio": {"type": "text", "label": "Predio al que corresponde"}, "dimensiones": {"type": "text", "unit": "m", "label": "Dimensiones (AnchoxLargoxAlto)"}}',
	validation_properties = '{"postes": {"type": "domain", "label": "Postes construidos", "domain": "yesNoDomain"}, "portones": {"type": "domain", "label": "Portones construidos", "domain": "yesNoDomain"}, "tejidos_alambre": {"type": "domain", "label": "Tejidos de alambre construidos", "domain": "yesNoDomain"}}'
WHERE
    code = 'cercado_perimetral';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"coordenada_x": {"type": "integer", "label": "Coordenada X"}, "coordenada_y": {"type": "integer", "label": "Coordenada Y"}, "tipo_lagunas": {"type": "domain", "label": "Tipo de lagunas", "domain": "pondType"}, "cantidad_lagunas": {"type": "integer", "label": "Cantidad de lagunas"}, "tipo_tratamiento": {"type": "text", "label": "Tipo de tratamiento"}}',
	validation_properties = '{"empastado": {"type": "domain", "label": "Empastado realizado", "domain": "yesNoDomain"}, "desarenador": {"type": "domain", "label": "Desarenador instalado", "domain": "yesNoDomain"}, "lecho_secado": {"type": "domain", "label": "Lecho de secado instalado", "domain": "yesNoDomain"}, "interconexiones": {"type": "domain", "label": "Construcción de interconexiones", "domain": "yesNoDomain"}, "intalacion_membranas": {"type": "domain", "label": "Instalación de membranas", "domain": "yesNoDomain"}}'
WHERE
    code = 'planta_tratamiento';

UPDATE building_component SET
    code = 'redes_basicas_condominiales_y_conexiones',
	code_label = 'Redes básicas, condominales y conexiones',
	"name" = 'Redes básicas, condominales y conexiones',
	technical_properties = '{"tipo_canheria_basica": {"type": "domain", "label": "Tipo de cañería básica", "domain": "pipeType"}, "longitud_caneria_basica": {"type": "decimal", "unit": "m", "label": "Longitud cañería básica"}, "tipo_canheria_dondominal": {"type": "domain", "label": "Tipo de cañería condominal", "domain": "pipeType"}, "longitud_caneria_condominal": {"type": "decimal", "unit": "m", "label": "Longitud cañería condominal"}}',
	validation_properties = '{"red_basica_instalada": {"type": "integer", "label": "Metros de red básica instalada"}, "conexiones_domiciliarias": {"type": "integer", "label": "Número de conexiones"}, "red_condominal_instalada": {"type": "integer", "label": "Metros de red condominal instalada"}}'
WHERE
    code = 'redes_conexiones';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"coordenada_x": {"type": "integer", "label": "Coordenada X"}, "coordenada_y": {"type": "integer", "label": "Coordenada Y"}, "tipo_energia": {"type": "domain", "label": "Tipo de energía", "domain": "energyType"}, "tipo_canheria": {"type": "domain", "label": "Tipo de cañería", "domain": "pipeType"}, "potencia_bomba": {"type": "decimal", "unit": "HP", "label": "Potencia de las bombas"}, "cantidad_bombas": {"type": "integer", "label": "Cantidad de bombas"}, "longitud_canheria": {"type": "decimal", "unit": "m", "label": "Longitud de la cañería de impulsión"}}',
	validation_properties = '{"obras_civiles": {"type": "domain", "label": "Obras civiles realizadas", "domain": "yesNoDomain"}, "linea_impulsion": {"type": "domain", "label": "Línea de impulsión realizada", "domain": "yesNoDomain"}, "permiso_municipal": {"type": "domain", "label": "Permiso municipal", "domain": "yesNoDomain"}, "casetas_operaciones": {"type": "domain", "label": "Casetas de operaciones instaladas", "domain": "yesNoDomain"}, "extension_electrica": {"type": "domain", "label": "Extensión eléctrica realizada", "domain": "yesNoDomain"}, "instalaciones_electromecanicas": {"type": "domain", "label": "Instalaciones electromecánicas realizadas", "domain": "yesNoDomain"}}'
WHERE
    code = 'estaciones_bombeo';

DELETE FROM building_component WHERE code = 'mejoramiento_agua';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"cantidad": {"type": "integer", "label": "Cantidad"}, "material": {"type": "domain", "label": "Material", "domain": "toiletMaterialType"}, "sistema_disposicion": {"type": "domain", "label": "Sistemas de disposición", "domain": "disposalSystemType"}}',
	validation_properties = '{"cantidad": {"type": "integer", "label": "Cantidad"}, "material": {"type": "domain", "label": "Material", "domain": "toiletMaterialType"}, "sistema_disposicion": {"type": "domain", "label": "Sistemas de disposición", "domain": "disposalSystemType"}}'
WHERE
    code = 'banos';

UPDATE building_component SET
	code_label = "name",
	technical_properties = '{"entrega": {"type": "integer", "label": "Unidades terminadas"}, "provision": {"type": "integer", "label": "Unidades provistas"}, "instalacion": {"type": "integer", "label": "Unidades instaladas"}}',
	validation_properties = '{"03_entrega": {"type": "integer", "label": "Unidades terminadas etapa 3"}, "01_provision": {"type": "integer", "label": "Unidades terminadas etapa 1"}, "02_instalacion": {"type": "integer", "label": "Unidades terminadas etapa 2"}}'
WHERE
    code = 'letrinas';


-- Fill labels for contract services

UPDATE contract_service set labels = '{"executionStartDate": "Fecha del acta de inicio"}' WHERE CODE = 'ejecucion_de_obra';

UPDATE contract_service set labels = '{"executionStartDate": "Fecha de la orden de proceder"}' WHERE CODE != 'ejecucion_de_obra';

COMMIT;
