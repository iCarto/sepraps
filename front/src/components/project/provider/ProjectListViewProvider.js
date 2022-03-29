import {useState, createContext, useContext} from "react";

let ProjectListViewContext = createContext(null);

export default function ProjectListViewProvider({children}) {
    const [view, setView] = useState("table");

    let value = {
        view,
        setView,
    };

    return (
        <ProjectListViewContext.Provider value={value}>
            {children}
        </ProjectListViewContext.Provider>
    );
}

function useProjectListView() {
    return useContext(ProjectListViewContext);
}

export {useProjectListView};
