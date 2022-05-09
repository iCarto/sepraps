import {useState, createContext, useContext} from "react";

let ContractListViewContext = createContext(null);

export default function ContractListViewProvider({children}) {
    const [view, setView] = useState("list");

    let value = {
        view,
        setView,
    };

    return (
        <ContractListViewContext.Provider value={value}>
            {children}
        </ContractListViewContext.Provider>
    );
}

function useContractListView() {
    return useContext(ContractListViewContext);
}

export {useContractListView};
