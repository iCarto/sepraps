import {createContext, useContext} from "react";
// import {useMapLayerProvider} from "base/component/geo";

let EntityMapContext = createContext(null);

export default function EntityMapProvider({service, children}) {
    // const [entityMapLayerProvider] = useMapLayerProvider(service, {
    //     included: true,
    // });

    let value = {
        // entityMapLayerProvider,
    };

    return (
        <EntityMapContext.Provider value={value}>{children}</EntityMapContext.Provider>
    );
}

function useEntityMapProvider() {
    return useContext(EntityMapContext);
}

export {useEntityMapProvider};
