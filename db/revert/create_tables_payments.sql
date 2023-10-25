-- Revert sepraps:create_tables_payments from pg

BEGIN;
--
-- Remove field comments from payment
--
DROP TABLE "payment_comments" CASCADE;
--
-- Remove field contract from payment
--
ALTER TABLE "payment" DROP COLUMN "contract_id" CASCADE;
--
-- Remove field created_by from payment
--
ALTER TABLE "payment" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from payment
--
ALTER TABLE "payment" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from payment
--
ALTER TABLE "payment" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field folder from payment
--
ALTER TABLE "payment" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field updated_by from payment
--
ALTER TABLE "payment" DROP COLUMN "updated_by_id" CASCADE;
--
-- Remove field created_by from product
--
ALTER TABLE "product" DROP COLUMN "created_by_id" CASCADE;
--
-- Remove field featured_document from product
--
ALTER TABLE "product" DROP COLUMN "featured_document_id" CASCADE;
--
-- Remove field featured_image from product
--
ALTER TABLE "product" DROP COLUMN "featured_image_id" CASCADE;
--
-- Remove field folder from product
--
ALTER TABLE "product" DROP COLUMN "folder_id" CASCADE;
--
-- Remove field payment from product
--
ALTER TABLE "product" DROP COLUMN "payment_id" CASCADE;
--
-- Remove field updated_by from product
--
ALTER TABLE "product" DROP COLUMN "updated_by_id" CASCADE;
--
-- Remove field awarding_budget_min from constructioncontract
--
ALTER TABLE "construction_contract" DROP COLUMN "awarding_budget_min" CASCADE;
--
-- Remove field bid_request_budget_min from constructioncontract
--
ALTER TABLE "construction_contract" DROP COLUMN "bid_request_budget_min" CASCADE;
--
-- Remove field payment_criteria_type from constructioncontract
--
ALTER TABLE "construction_contract" DROP COLUMN "payment_criteria_type" CASCADE;
--
-- Remove field payment_frequency_type from constructioncontract
--
ALTER TABLE "construction_contract" DROP COLUMN "payment_frequency_type" CASCADE;
--
-- Remove field total_amount_type from constructioncontract
--
ALTER TABLE "construction_contract" DROP COLUMN "total_amount_type" CASCADE;
--
-- Remove field active from fieldreport
--
ALTER TABLE "field_report" DROP COLUMN "active" CASCADE;
--
-- Remove field active from fieldreportproject
--
ALTER TABLE "field_report_project" DROP COLUMN "active" CASCADE;
--
-- Remove field active from fieldreportprojectactivity
--
ALTER TABLE "field_report_project_activity" DROP COLUMN "active" CASCADE;
--
-- Remove field active from provider
--
ALTER TABLE "provider" DROP COLUMN "active" CASCADE;

--
-- Remove permissions configuration
--
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_comment');
DELETE FROM auth_permission WHERE codename like '%_comment';
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_payment');
DELETE FROM auth_permission WHERE codename like '%_payment';
DELETE FROM auth_group_permissions gp WHERE gp.permission_id in (select p.id from auth_permission p WHERE p.codename like '%_product');
DELETE FROM auth_permission WHERE codename like '%_product';

--
-- Remove content types
--
DELETE FROM django_content_type where app_label = 'app' and model in ('comment', 'payment', 'product');

--
-- Delete model Comment
--
DROP TABLE "comment" CASCADE;
--
-- Delete model Payment
--
DROP TABLE "payment" CASCADE;
--
-- Delete model Product
--
DROP TABLE "product" CASCADE;

COMMIT;

