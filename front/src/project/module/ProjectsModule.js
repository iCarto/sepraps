import {ModuleLayout} from "base/ui/module/components";
import {ModuleConfigProvider} from "base/ui/module/provider";
import {ProjectPageMenu} from "project/menu";

const ProjectsModule = () => {
    return (
        <ModuleConfigProvider>
            <ModuleLayout title="Proyectos" menu={<ProjectPageMenu />} />
        </ModuleConfigProvider>
    );
};

export default ProjectsModule;
