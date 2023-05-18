import {useState, createContext, useContext, useEffect} from "react";
import {useConfigModule} from "base/ui/module/provider";

let ListContext = createContext(null);

export default function ListProvider({children}) {
    const {moduleFilter} = useConfigModule();

    const [elements, setElements] = useState([]);
    const [view, setView] = useState("table");
    const [filter, setFilter] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(0);
    const [sort, setSort] = useState("id");
    const [order, setOrder] = useState("asc");

    useEffect(() => {
        setFilter({...filter, ...moduleFilter});
    }, [moduleFilter]);

    let value = {
        elements,
        setElements,
        view,
        setView,
        filter,
        setFilter,
        page,
        setPage,
        size,
        setSize,
        sort,
        setSort,
        order,
        setOrder,
    };

    console.log({elements, filter, moduleFilter});

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}

function useListView() {
    return useContext(ListContext);
}

export {useListView as useList};
