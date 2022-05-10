-- Deploy sepraps:update_financing_program_relationship to pg
BEGIN;

SET
    CONSTRAINTS ALL IMMEDIATE;

--
-- Add field financing_program to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "financing_program_id_aux" integer;

-- Store financing program id in a temporary column for contracts
with contracts_financing_programs as (
    select
        distinct c.id as contract_id,
        p.financing_program_id
    from
        construction_contract c
        left join project p on c.id = p.construction_contract_id
)
update
    construction_contract cc
set
    financing_program_id_aux = cfp.financing_program_id
from
    contracts_financing_programs cfp
where
    cfp.contract_id = cc.id;

--
-- Remove field financing_fund from project
--
SET
    CONSTRAINTS "project_financing_fund_id_fc988f79_fk_financing_fund_id" IMMEDIATE;

ALTER TABLE
    "project" DROP CONSTRAINT "project_financing_fund_id_fc988f79_fk_financing_fund_id";

ALTER TABLE
    "project" DROP COLUMN "financing_fund_id" CASCADE;

--
-- Remove field financing_program from project
--
SET
    CONSTRAINTS "project_financing_program_id_167c4fbc_fk_financing_program_id" IMMEDIATE;

ALTER TABLE
    "project" DROP CONSTRAINT "project_financing_program_id_167c4fbc_fk_financing_program_id";

ALTER TABLE
    "project" DROP COLUMN "financing_program_id" CASCADE;

--
-- Add field financing_program to constructioncontract
--
ALTER TABLE
    "construction_contract"
ADD
    COLUMN "financing_program_id" integer NULL CONSTRAINT "construction_contrac_financing_program_id_416f58e0_fk_financing" REFERENCES "financing_program"("id") DEFERRABLE INITIALLY DEFERRED;

SET
    CONSTRAINTS "construction_contrac_financing_program_id_416f58e0_fk_financing" IMMEDIATE;

-- Update financing program in definitve column and delete temporary comlumn
update
    construction_contract
set
    financing_program_id = financing_program_id_aux;

alter table
    construction_contract drop column financing_program_id_aux;

--
-- Add field closed to financingprogram
--
ALTER TABLE
    "financing_program"
ADD
    COLUMN "closed" boolean DEFAULT false NOT NULL;

ALTER TABLE
    "financing_program"
ALTER COLUMN
    "closed" DROP DEFAULT;

--
-- Add field financing_funds to financingprogram
--
CREATE TABLE "financing_program_financing_funds" (
    "id" bigserial NOT NULL PRIMARY KEY,
    "financingprogram_id" integer NOT NULL,
    "financingfund_id" integer NOT NULL
);

CREATE INDEX "construction_contract_financing_program_id_416f58e0" ON "construction_contract" ("financing_program_id");

ALTER TABLE
    "financing_program_financing_funds"
ADD
    CONSTRAINT "financing_program_financ_financingprogram_id_fina_49f2de52_uniq" UNIQUE ("financingprogram_id", "financingfund_id");

ALTER TABLE
    "financing_program_financing_funds"
ADD
    CONSTRAINT "financing_program_fi_financingprogram_id_f65f140a_fk_financing" FOREIGN KEY ("financingprogram_id") REFERENCES "financing_program" ("id") DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE
    "financing_program_financing_funds"
ADD
    CONSTRAINT "financing_program_fi_financingfund_id_811527b8_fk_financing" FOREIGN KEY ("financingfund_id") REFERENCES "financing_fund" ("id") DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX "financing_program_financing_funds_financingprogram_id_f65f140a" ON "financing_program_financing_funds" ("financingprogram_id");

CREATE INDEX "financing_program_financing_funds_financingfund_id_811527b8" ON "financing_program_financing_funds" ("financingfund_id");

-- Copy relationship between financing funds and financing programs to the new table
insert into
    financing_program_financing_funds (financingprogram_id, financingfund_id)
select
    id,
    financing_fund_id
from
    financing_program;

--
-- Remove field financing_fund from financingprogram
--
SET
    CONSTRAINTS "financing_program_financing_fund_id_c55e6217_fk_financing" IMMEDIATE;

ALTER TABLE
    "financing_program" DROP CONSTRAINT "financing_program_financing_fund_id_c55e6217_fk_financing";

ALTER TABLE
    "financing_program" DROP COLUMN "financing_fund_id" CASCADE;

COMMIT;
