import {useRef} from "react";
import L from "leaflet";

export function useBaseLayer() {
    let layerRef = useRef(null);

    const addBaseLayer = map => {
        layerRef.current = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    };

    return {layerRef, addBaseLayer};
}
