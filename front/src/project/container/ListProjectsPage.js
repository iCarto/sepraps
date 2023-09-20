import {ProjectService} from "project/service";
import {useProjectTable} from "project/data/ProjectsTableColumns";
import {EntityListPage} from "base/entity/components/container";
import {ProjectFilterForm} from "project/presentational/form";
import {ProjectCard} from "project/presentational";
import {discriminators, useProjectLayer} from "project/geo";

const ListProjectsPage = () => {
    const {tableColumns, getCellProps} = useProjectTable();

    return (
        <EntityListPage
            views={["table", "list", "map"]}
            entityName="Proyectos"
            service={ProjectService}
            tableColumns={tableColumns}
            getCellProps={getCellProps}
            filterForm={<ProjectFilterForm />}
            basePath="projects"
            card={ProjectCard}
            layerHook={useProjectLayer}
            layerDefaultDiscriminator={discriminators.STATUS}
        />
    );
};
export default ListProjectsPage;
