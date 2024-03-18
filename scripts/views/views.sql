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
)
SELECT
	p.id as project_id,
	sum(financial_progress) as financial_progress_percentage,
	sum(physical_progress) as physical_progress_percentage
FROM project p
LEFT JOIN bcmp ON bcmp.project_id = p.id
GROUP BY p.id;
