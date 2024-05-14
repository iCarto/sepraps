import {useState, createContext, useContext} from "react";

let StatsViewContext = createContext(null);

export default function StatsViewProvider({children}) {
    const [view, setView] = useState("chart");

    let value = {
        view,
        setView,
    };

    return (
        <StatsViewContext.Provider value={value}>{children}</StatsViewContext.Provider>
    );
}

function useStatsView() {
    return useContext(StatsViewContext);
}

export {useStatsView};
