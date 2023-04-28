import {useState, createContext, useContext} from "react";
import {LocationProvider} from "sepraps/location/provider";
import {DomainProvider} from "sepraps/domain/provider";

let StatsFilterContext = createContext(null);

export default function StatsFilterProvider({children}) {
    const [filterAttributes, setFilterAttributesInState] = useState({});

    const setFilterAttributes = filterAttributesForState => {
        const filterAttributes = {};
        // Remove attributes with empty values
        Object.keys(filterAttributesForState).forEach(filterAttribute => {
            if (filterAttributesForState[filterAttribute]) {
                filterAttributes[filterAttribute] =
                    filterAttributesForState[filterAttribute];
            }
        });
        setFilterAttributesInState(filterAttributes);
    };

    let value = {
        filterAttributes,
        setFilterAttributes,
    };

    return (
        <StatsFilterContext.Provider value={value}>
            <LocationProvider>
                <DomainProvider>{children}</DomainProvider>
            </LocationProvider>
        </StatsFilterContext.Provider>
    );
}

function useStatsFilter() {
    return useContext(StatsFilterContext);
}

export {useStatsFilter};
