import {useState, createContext, useContext} from "react";

let ModuleConfigContext = createContext(null);

export default function ModuleConfigProvider({children}) {
    const [moduleFilter, setModuleFilterInternal] = useState({
        project: null,
        contract: null,
        provider: null,
        project_field: null,
    });
    const [moduleBasePath, setModuleBasePath] = useState(null);

    const addToModuleFilter = filter => {
        const newModuleFilter = {...moduleFilter, ...filter};

        // Compare objects to avoid duplicate calls with same filter
        if (JSON.stringify(moduleFilter) !== JSON.stringify(newModuleFilter)) {
            setModuleFilterInternal({...moduleFilter, ...filter});
        }
    };

    let value = {
        moduleFilter,
        addToModuleFilter,
        moduleBasePath,
        setModuleBasePath,
    };

    return (
        <ModuleConfigContext.Provider value={value}>
            {children}
        </ModuleConfigContext.Provider>
    );
}

function useConfigModule() {
    return useContext(ModuleConfigContext);
}

export {useConfigModule};
