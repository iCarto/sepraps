import {ProjectService} from "project/service";
import {EntityListPage} from "base/entity/pages";
import {ProjectFilterForm} from "project/presentational/form";
import {useProjectTable} from "project/data/ProjectsTableColumns";

const ListProjectsPage = () => {
    const {tableColumns} = useProjectTable();

    return (
        <EntityListPage
            views={["list", "table", "map"]}
            entityName="proyectos"
            basePath="projects"
            service={ProjectService.getAll}
            tableColumns={tableColumns}
            filterForm={<ProjectFilterForm />}
        />
    );
};
export default ListProjectsPage;
