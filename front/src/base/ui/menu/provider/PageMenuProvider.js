import {useState, createContext, useContext} from "react";

let PageMenuContext = createContext(null);

export default function PageMenuProvider({children}) {
    const [expandedGroup, setExpandedGroup] = useState(null);

    const clearSelected = () => {
        setExpandedGroup(null);
    };

    let value = {
        expandedGroup,
        setExpandedGroup,
        clearSelected,
    };

    return (
        <PageMenuContext.Provider value={value}>{children}</PageMenuContext.Provider>
    );
}

function usePageMenu() {
    return useContext(PageMenuContext);
}

export {usePageMenu};
