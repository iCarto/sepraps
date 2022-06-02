-- Deploy sepraps:update_construction_contract_dates to pg
BEGIN;

--
-- Add field expected_execution_period to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "expected_execution_period" integer NULL;

--
-- Add field warranty_end_date to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "warranty_end_date" date NULL;

-- Update expected_execution_period with the old value from bid_request_deadline
UPDATE
    construction_contract
SET
    expected_execution_period = bid_request_deadline * 30
WHERE
    bid_request_deadline IS NOT NULL;

--
-- Remove field bid_request_deadline from constructioncontract
--
ALTER TABLE
    "construction_contract" DROP COLUMN "bid_request_deadline" CASCADE;

--
-- Remove field execution_expected_delivery_date from constructioncontract
--
ALTER TABLE
    "construction_contract" DROP COLUMN "execution_expected_delivery_date" CASCADE;

--
-- Remove field execution_order_start_date from constructioncontract
--
ALTER TABLE
    "construction_contract" DROP COLUMN "execution_order_start_date" CASCADE;

COMMIT;
