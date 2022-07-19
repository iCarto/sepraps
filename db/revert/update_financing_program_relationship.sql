-- Revert sepraps:update_financing_program_relationship from pg
BEGIN;

SET
    CONSTRAINTS ALL IMMEDIATE;

--
-- Remove field closed from financingprogram
--
ALTER TABLE
    "financing_program" DROP COLUMN "closed" CASCADE;

--
-- Add field financing_fund to financingprogram
--
ALTER TABLE
    "financing_program"
ADD
    COLUMN "financing_fund_id" integer NULL CONSTRAINT "financing_program_financing_fund_id_c55e6217_fk_financing" REFERENCES "financing_fund"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "financing_program_financing_fund_id_c55e6217_fk_financing" IMMEDIATE;

CREATE INDEX "financing_program_financing_fund_id_c55e6217" ON "financing_program" ("financing_fund_id");

with financing_program_fund as (
    select
        distinct financingfund_id,
        financingprogram_id
    from
        financing_program_financing_funds
)
update
    financing_program fp
set
    financing_fund_id = fpf.financingfund_id
from
    financing_program_fund fpf
where
    fpf.financingprogram_id = fp.id;

--
-- Remove field financing_funds from financingprogram
--
DROP TABLE "financing_program_financing_funds" CASCADE;

--
-- Add field financing_fund to project
--
ALTER TABLE
    "project"
ADD
    COLUMN "financing_fund_id" integer NULL CONSTRAINT "project_financing_fund_id_fc988f79_fk_financing_fund_id" REFERENCES "financing_fund"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "project_financing_fund_id_fc988f79_fk_financing_fund_id" IMMEDIATE;

--
-- Add field financing_program to project
--
ALTER TABLE
    "project"
ADD
    COLUMN "financing_program_id" integer NULL CONSTRAINT "project_financing_program_id_167c4fbc_fk_financing_program_id" REFERENCES "financing_program"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "project_financing_program_id_167c4fbc_fk_financing_program_id" IMMEDIATE;

CREATE INDEX "project_financing_fund_id_fc988f79" ON "project" ("financing_fund_id");

CREATE INDEX "project_financing_program_id_167c4fbc" ON "project" ("financing_program_id");

-- Store financing program id in a temporary column for contracts
with projects_financing_programs as (
    select
        distinct p.id as project_id,
        c.financing_program_id,
        fp.financing_fund_id
    from
        project p
        left join construction_contract c on c.id = p.construction_contract_id
        left join financing_program fp on fp.id = c.financing_program_id
)
update
    project p
set
    financing_program_id = pfp.financing_program_id,
    financing_fund_id = pfp.financing_fund_id
from
    projects_financing_programs pfp
where
    pfp.project_id = p.id;

--
-- Remove field financing_program from constructioncontract
--
ALTER TABLE
    "construction_contract" DROP COLUMN "financing_program_id" CASCADE;

COMMIT;
