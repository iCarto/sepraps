-- Revert sepraps:update_construction_contract_dates from pg
BEGIN;

ALTER TABLE
    "construction_contract"
ADD
    COLUMN "bid_request_deadline" integer NULL;

ALTER TABLE
    "construction_contract"
ADD
    COLUMN "execution_expected_delivery_date" date NULL;

ALTER TABLE
    "construction_contract"
ADD
    COLUMN "execution_order_start_date" date NULL;

-- Update bid_request_deadline with the old value from expected_execution_period
UPDATE
    construction_contract
SET
    bid_request_deadline = expected_execution_period / 30
WHERE
    expected_execution_period IS NOT NULL;

ALTER TABLE
    "construction_contract" DROP COLUMN "expected_execution_period" CASCADE;

ALTER TABLE
    "construction_contract" DROP COLUMN "warranty_end_date" CASCADE;

COMMIT;
