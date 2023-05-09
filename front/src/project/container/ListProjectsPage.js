import {ProjectService} from "project/service";
import {useProjectTable} from "project/data/ProjectsTableColumns";
import {EntityListPage} from "base/entity/pages";
import {ProjectFilterForm} from "project/presentational/form";
import {useProjectLayer} from "project/geo";
import {ProjectCard} from "project/presentational";

const ListProjectsPage = () => {
    const {tableColumns} = useProjectTable();

    return (
        <EntityListPage
            service={ProjectService.getAll}
            mapLayer={useProjectLayer}
            views={["list", "table", "map"]}
            entityName="proyectos"
            basePath="projects"
            tableColumns={tableColumns}
            filterForm={<ProjectFilterForm />}
            card={ProjectCard}
        />
    );
};
export default ListProjectsPage;
