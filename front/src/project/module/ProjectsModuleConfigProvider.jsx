import {ProjectWorkTypeService} from "project/service";
import {useState, createContext, useContext, useEffect} from "react";

let ProjectsModuleConfigProviderContext = createContext(null);

export default function ProjectsModuleConfigProvider({children}) {
    const [projectWorkTypes, setProjectWorkTypes] = useState([]);

    useEffect(() => {
        ProjectWorkTypeService.getList().then(projectWorkTypes => {
            setProjectWorkTypes(projectWorkTypes);
        });
    }, []);

    let value = {
        projectWorkTypes,
    };

    return (
        <ProjectsModuleConfigProviderContext.Provider value={value}>
            {children}
        </ProjectsModuleConfigProviderContext.Provider>
    );
}

function useProjectConfigModule() {
    return useContext(ProjectsModuleConfigProviderContext);
}

export {useProjectConfigModule};
