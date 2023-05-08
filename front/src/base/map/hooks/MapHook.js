import {useRef} from "react";
import L from "leaflet";
import "proj4leaflet";
import "leaflet/dist/leaflet.css";
import {useBaseLayer} from "base/map/hooks";
import {MAP_COORDINATES} from "sepraps/config";

export const mapOverlayPanes = [...Array(10).keys()].map(i => "overlayPane" + i);

export function useMap() {
    const mapRef = useRef(null);

    const {addBaseLayer} = useBaseLayer();

    const createMap = () => {
        const map = L.map(mapRef.current, {
            minZoom: 0,
            maxZoom: 18,
            center: MAP_COORDINATES,
            zoom: 9,
        });
        addBaseLayer(map);

        // Add a series of custom panes for overlay layers
        mapOverlayPanes.forEach((p, i) => {
            map.createPane(p);
            map.getPane(p).style.zIndex = (400 + (i + 1) * 5).toString();
        });

        return map;
    };

    return {mapRef, createMap};
}
