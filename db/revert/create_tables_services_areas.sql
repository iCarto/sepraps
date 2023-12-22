-- Revert sepraps:create_tables_services_areas from pg

BEGIN;

ALTER TABLE dominios ALTER COLUMN category TYPE varchar(20);

--
-- Remove field contract_service from contractservicevalue
--
ALTER TABLE "contract_service_value" DROP COLUMN "contract_service_id" CASCADE;
--
-- Remove field contract from contractsupervisionarea
--
ALTER TABLE "contract_supervision_area" DROP COLUMN "contract_id" CASCADE;
--
-- Remove field services from constructioncontract
--
ALTER TABLE "construction_contract" DROP COLUMN "services" CASCADE;
--
-- Remove field updated_by from constructioncontract
--
ALTER TABLE "construction_contract" DROP COLUMN "updated_by_id" CASCADE;
--
-- Add field execution_final_delivery_date to constructioncontract
--
ALTER TABLE "construction_contract" ADD COLUMN "execution_final_delivery_date" date NULL;
--
-- Alter field creation_user on constructioncontract
--
-- (no-op)
--
-- Alter field contract on payment
--
-- (no-op)
--
-- Delete model ContractService
--
DROP TABLE "contract_service" CASCADE;
--
-- Delete model ContractServiceValue
--
DROP TABLE "contract_service_value" CASCADE;
--
-- Delete model ContractSupervisionArea
--
DROP TABLE "contract_supervision_area" CASCADE;

DELETE FROM public.media_node WHERE storage_path like '%contractservice%';

COMMIT;
