-- Deploy sepraps:update_contract_lot_insurances to pg

BEGIN;

--
-- Add field awarding_accident_insurance to constructioncontract
--
ALTER TABLE "construction_contract" ADD COLUMN "awarding_accident_insurance" varchar(20) NULL;
--
-- Add field awarding_liability_insurance to constructioncontract
--
ALTER TABLE "construction_contract" ADD COLUMN "awarding_liability_insurance" varchar(20) NULL;
--
-- Add field awarding_professional_liability_insurance to constructioncontract
--
ALTER TABLE "construction_contract" ADD COLUMN "awarding_professional_liability_insurance" varchar(20) NULL;
--
-- Add field bid_request_lot_number to constructioncontract
--
ALTER TABLE "construction_contract" ADD COLUMN "bid_request_lot_number" text NULL;


COMMIT;
