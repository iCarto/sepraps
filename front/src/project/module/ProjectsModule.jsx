import {ModuleLayout} from "base/ui/module/components";
import {ModuleConfigProvider} from "base/ui/module/provider";
import {ProjectPageMenu} from "project/menu";
import {ProjectsModuleConfigProvider} from ".";

const ProjectsModule = () => {
    return (
        <ModuleConfigProvider>
            <ProjectsModuleConfigProvider>
                <ModuleLayout title="Proyectos" menu={<ProjectPageMenu />} />
            </ProjectsModuleConfigProvider>
        </ModuleConfigProvider>
    );
};

export default ProjectsModule;
