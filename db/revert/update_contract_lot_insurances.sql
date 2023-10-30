-- Revert sepraps:update_contract_lot_insurances from pg

BEGIN;

ALTER TABLE
    "construction_contract"
        DROP COLUMN "awarding_accident_insurance",
        DROP COLUMN "awarding_liability_insurance",
        DROP COLUMN "awarding_professional_liability_insurance",
        DROP COLUMN "bid_request_lot_number";

COMMIT;
