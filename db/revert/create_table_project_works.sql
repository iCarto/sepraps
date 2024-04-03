-- Revert sepraps:create_table_project_works from pg

BEGIN;

ALTER TABLE "project" ADD COLUMN "project_class" varchar(50) NULL;
ALTER TABLE "project" ADD COLUMN "project_type" varchar(50) NULL;

UPDATE project p
SET project_type=pw.work_type,
    project_class=pw.work_class
FROM (
	SELECT DISTINCT ON (project_id)
		work_type, work_class, project_id
    FROM project_work
    ORDER BY project_id, id
) AS pw
WHERE pw.project_id = p.id;

ALTER TABLE "project_work" DROP COLUMN "project_id" CASCADE;

DROP TABLE "project_work" CASCADE;

COMMIT;
