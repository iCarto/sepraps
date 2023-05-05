import {ProjectService} from "project/service";
import {useProjectTable} from "project/data/ProjectsTableColumns";
import {EntityListPage} from "base/entity/pages";
import {ProjectFilterForm} from "project/presentational/form";

const ListProjectsPage = () => {
    const {tableColumns} = useProjectTable();

    return (
        <EntityListPage
            service={ProjectService.getAll}
            views={["list", "table", "map"]}
            entityName="proyectos"
            basePath="projects"
            tableColumns={tableColumns}
            filterForm={<ProjectFilterForm />}
        />
    );
};
export default ListProjectsPage;
