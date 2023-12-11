import {useState, createContext, useContext} from "react";

let PageMenuContext = createContext(null);

export default function PageMenuProvider({children}) {
    const [opened, setOpened] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const clearSelected = () => {
        setOpened(null);
        setSelectedGroup(null);
    };

    let value = {
        opened,
        setOpened,
        selectedGroup,
        setSelectedGroup,
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
