import {ProjectService} from "project/service";
import {useProjectTable} from "project/data/ProjectsTableColumns";
import {EntityListPage} from "base/entity/components/container";
import {ProjectFilterForm} from "project/presentational/form";
import {ProjectCard} from "project/presentational";

const ListProjectsPage = () => {
    const {tableColumns, highlightItems} = useProjectTable();

    return (
        <EntityListPage
            views={["table", "list"]}
            entityName="Proyectos"
            service={ProjectService}
            tableColumns={tableColumns}
            filterForm={<ProjectFilterForm />}
            basePath="projects"
            card={ProjectCard}
        />
    );
};
export default ListProjectsPage;
