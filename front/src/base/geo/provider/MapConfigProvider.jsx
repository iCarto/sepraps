import {useConfigModule} from "base/ui/module/provider";
import {createContext, useContext, useEffect, useState} from "react";
import {availableBaseLayers} from "..";

let MapConfigContext = createContext(null);

export default function MapConfigProvider({children}) {
    const {moduleFilter} = useConfigModule();
    const [selectedBaseLayer, setSelectedBaseLayer] = useState(availableBaseLayers[0]);

    // From ModuleProvider moduleFilter initializes mapFilter
    const [mapFilter, setMapFilter] = useState({...moduleFilter, buffer: 0});

    // And this component have to check changes in moduleFilter to update mapFilter
    useEffect(() => {
        const newMapFilter = {...mapFilter, ...moduleFilter};

        // Compare objects to avoid duplicate calls with same filter
        if (JSON.stringify(mapFilter) !== JSON.stringify(newMapFilter)) {
            setMapFilter({...mapFilter, ...moduleFilter});
        }
    }, [moduleFilter]);

    const getBuffer = () => {
        return mapFilter["buffer"];
    };

    const setBuffer = buffer => {
        setMapFilter({...mapFilter, buffer});
    };

    return (
        <MapConfigContext.Provider
            value={{
                mapFilter,
                setMapFilter,
                getBuffer,
                setBuffer,
                selectedBaseLayer,
                setSelectedBaseLayer,
            }}
        >
            {children}
        </MapConfigContext.Provider>
    );
}

function useMapConfig() {
    return useContext(MapConfigContext);
}

export {useMapConfig};
