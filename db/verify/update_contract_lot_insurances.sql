-- Verify sepraps:update_contract_lot_insurances on pg

BEGIN;

SELECT
    awarding_accident_insurance,
    awarding_liability_insurance,
    awarding_professional_liability_insurance,
    bid_request_lot_number
FROM
    "construction_contract"
WHERE
    false;

ROLLBACK;
