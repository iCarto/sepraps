BEGIN;

-- MIGRATION DATA FROM QUESTIONNAIRES

/*

-- CHECK CERTIFICATIONS FOR PROJECTOS WITHOUT CONSTRUCTION CONTRACT AND RESOLVE!!
-- PAYMENT ID is mandatory for certifications


WITH project_contracts as (
	select distinct on (cp.project_id)
		cp.project_id as project_id,
		cc.id as contract_id
	from contract_project cp
	join construction_contract cc ON cc.id = cp.contract_id AND 'ejecucion_de_obra' = ANY(cc.services) AND cc.closed = False
	order by cp.project_id, cc.execution_start_date
)
select *
FROM monthly_questionnaire_instance mqi
	LEFT JOIN project_questionnaire_instance pqi ON pqi.questionnaire_instance_id = mqi.id
	LEFT JOIN project_contracts cp ON cp.project_id = pqi.project_id
	WHERE pqi.questionnaire_id = 'certificacion_mensual' and cp.contract_id is null
	ORDER BY year, month;

 */

ALTER TABLE payment ADD CONSTRAINT payment_name_contract_key UNIQUE (name, contract_id);

WITH project_contracts as (
	select distinct on (cp.project_id)
		cp.project_id as project_id,
		cc.id as contract_id
	from contract_project cp
	join construction_contract cc ON cc.id = cp.contract_id AND 'ejecucion_de_obra' = ANY(cc.services) AND cc.closed = False
	order by cp.project_id, cc.execution_start_date
)
INSERT INTO	payment
(
	name,
	status,
	approval_date,
	created_by_id,
	created_at,
	updated_by_id,
	updated_at,
	active,
	contract_id
)
(
	SELECT
		concat(mqi.month, '/', mqi.year, ' (review)') as name,
		'aprobado',
		make_date(mqi.year, mqi.month, 1),
		mqi.creation_user_id,
		mqi.created_at,
		1,
		now(),
		True,
		pc.contract_id
	FROM monthly_questionnaire_value mqv
	LEFT JOIN monthly_questionnaire_instance mqi ON mqi.id = mqv.questionnaire_instance_id
	LEFT JOIN project_questionnaire_instance pqi ON pqi.questionnaire_instance_id = mqi.id
	LEFT JOIN project_contracts pc ON pc.project_id = pqi.project_id
	WHERE pqi.questionnaire_id = 'certificacion_mensual'
	ORDER BY year, month
) ON CONFLICT DO NOTHING;

WITH project_contracts as (
	select distinct on (cp.project_id)
		cp.project_id as project_id,
		cc.id as contract_id
	from contract_project cp
	join construction_contract cc ON cc.id = cp.contract_id AND 'ejecucion_de_obra' = ANY(cc.services) AND cc.closed = False
	order by cp.project_id, cc.execution_start_date
)
INSERT INTO	certification
(
	expected_amount,
	approved_amount,
	notes,
	created_by_id,
	created_at,
	updated_by_id,
	updated_at,
	active,
	project_id,
	payment_id
)
(
	SELECT
		CASE WHEN mqv.expected_value~E'^\\d+$' THEN mqv.expected_value::bigint ELSE 0 END,
		CASE WHEN mqv.value~E'^\\d+$' THEN mqv.value::bigint ELSE 0 END,
		mqi."comments",
		mqi.creation_user_id,
		mqi.created_at,
		1,
		now(),
		True,
		pqi.project_id,
		(
			SELECT id
			FROM payment pm
			WHERE concat(mqi.month, '/', mqi.year, ' (review)') = pm.name
				AND pm.contract_id = cp.contract_id
		) as payment_id
	FROM monthly_questionnaire_value mqv
	LEFT JOIN monthly_questionnaire_instance mqi ON mqi.id = mqv.questionnaire_instance_id
	LEFT JOIN project_questionnaire_instance pqi ON pqi.questionnaire_instance_id = mqi.id
	LEFT JOIN project_contracts cp ON cp.project_id = pqi.project_id
	WHERE pqi.questionnaire_id = 'certificacion_mensual'
	ORDER BY year, month
);

ALTER TABLE payment DROP CONSTRAINT payment_name_contract_key;

UPDATE payment p
	SET
		expected_fixed_amount = cert.expected_amount,
		expected_total_amount = cert.expected_amount,
		paid_fixed_amount = cert.approved_amount,
		paid_total_amount  = cert.approved_amount
FROM (
	select sum(c.expected_amount) as expected_amount, sum(c.approved_amount) as approved_amount, payment_id from certification c
	group by payment_id
) AS cert
WHERE cert.payment_id = p.id;

-- Media folders (payments and certifications)

INSERT INTO public.media_node
(media_type, media_name, storage_path, created_at, creation_user_id)
SELECT
	'FOLDER',
	'Payment_' || pm.id,
	'payment/' || pm.id,
	now(),
	1
FROM payment pm;

UPDATE payment pm
SET folder_id = mn.id
FROM media_node mn where pm.folder_id is null AND mn.storage_path = 'payment/' || pm.id;

INSERT INTO public.media_node
(media_type, media_name, storage_path, created_at, creation_user_id)
SELECT
	'FOLDER',
	'Certification_' || c.id,
	'certification/' || c.id,
	now(),
	1
FROM certification c;

UPDATE certification c
SET folder_id = mn.id
FROM media_node mn where mn.storage_path = 'certification/' || c.id;

COMMIT;
