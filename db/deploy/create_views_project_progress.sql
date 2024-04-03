-- Deploy sepraps:create_views_project_progress to pg

BEGIN;

CREATE OR REPLACE VIEW bcm_progress AS
select
 bcm.id as building_component_monitoring_id,
 bcm.project_id as project_id,
 bcm.expected_amount as bcm_expected_amount,
 bcm.paid_amount as paid_amount,
 case
        when COUNT(bcm.expected_amount) over (partition by bcm.project_id) = COUNT(bcm.id) over (partition by bcm.project_id)
        then ROUND(bcm.expected_amount / SUM(bcm.expected_amount) over (partition by bcm.project_id), 2)
        else null
    end as financial_weight,
 ROUND((bcm.paid_amount / NULLIF(bcm.expected_amount, 0)) * 100, 2) as financial_progress_percentage,
 bcm.physical_progress_percentage
from building_component_monitoring bcm
where bcm.active = True;

CREATE OR REPLACE VIEW project_progress AS
WITH bcmp AS (
	SELECT
		ROUND(financial_weight * financial_progress_percentage, 2) as financial_progress,
		ROUND(financial_weight * physical_progress_percentage, 2) as physical_progress,
		project_id
	FROM bcm_progress
	WHERE financial_weight is not null
),
project_progress AS (
	SELECT
		bcmp.project_id,
		sum(financial_progress) as financial_progress_percentage,
		sum(physical_progress) as physical_progress_percentage
	FROM bcmp
	GROUP BY bcmp.project_id
),
sctp AS (
	SELECT
		scm.project_id,
		SUM(sct.number_of_women + sct.number_of_men) as number_of_participants,
		ROUND((SUM(sct.number_of_women)::decimal / SUM(sct.number_of_women + sct.number_of_men)::decimal) * 100, 2) as percentage_of_women
	FROM social_component_training sct
	LEFT JOIN social_component_monitoring scm ON sct.social_component_monitoring_id = scm.id
	GROUP BY scm.project_id
)
SELECT
	p.id as project_id,
	pp.financial_progress_percentage,
	pp.physical_progress_percentage,
	sctp.number_of_participants,
	sctp.percentage_of_women,
	c.number_of_planned_connections,
	c.number_of_actual_connections,
	ROUND((c.number_of_actual_connections::decimal / c.number_of_planned_connections::decimal) * 100, 2) as percentage_of_connections
FROM project p
	LEFT JOIN project_progress pp ON pp.project_id = p.id
	LEFT JOIN sctp ON sctp.project_id = p.id
	LEFT JOIN "connection" c ON c.project_id = p.id;


COMMIT;
