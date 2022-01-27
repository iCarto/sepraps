import {useState, createContext, useContext} from "react";

let FolderViewContext = createContext(null);

export default function FolderViewProvider({children}) {
    const [view, setView] = useState("detail");

    let value = {
        view,
        setView,
    };

    return (
        <FolderViewContext.Provider value={value}>
            {children}
        </FolderViewContext.Provider>
    );
}

function useFolderView() {
    return useContext(FolderViewContext);
}

export {useFolderView};
