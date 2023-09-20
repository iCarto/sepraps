import {useEffect, useRef} from "react";
import L from "leaflet";
import "proj4leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {availableBaseLayers, useBaseLayer, useCRS} from ".";
import {MAP_COORDINATES} from "sepraps/config";
import {useCoordinatesMapControl} from "./controls";
import {useMapConfig} from "./provider";

export const mapOverlayPanes = [...Array(10).keys()].map(i => "overlayPane" + i);

export function useMap() {
    const mapRef = useRef(null);
    const mapObjectRef = useRef(null);
    const {setBaseLayer} = useBaseLayer();
    const {selectedBaseLayer} = useMapConfig();
    const {addCoordinatesMapControl} = useCoordinatesMapControl();

    const {crs} = useCRS();

    const mapOptions = {
        minZoom: 0,
        maxZoom: 18,
        center: MAP_COORDINATES,
        zoom: 7,
        zoomSnap: 0, // http://leafletjs.com/reference.html#map-zoomsnap
    };
    if (crs) {
        mapOptions["crs"] = crs;
    }

    useEffect(() => {
        console.log({selectedBaseLayer});
        if (mapObjectRef.current) {
            setBaseLayer(mapObjectRef.current, selectedBaseLayer);
        }
    }, [selectedBaseLayer]);

    const createMap = () => {
        const map = L.map(mapRef.current, {
            ...mapOptions,
        });

        setBaseLayer(map, availableBaseLayers[0]);

        addCoordinatesMapControl(map);

        // addDownloadMapControl(map);

        // Add a series of custom panes for overlay layers
        mapOverlayPanes.forEach((p, i) => {
            map.createPane(p);
            map.getPane(p).style.zIndex = (400 + (i + 1) * 5).toString();
        });

        mapObjectRef.current = map;

        return map;
    };

    return {mapRef, createMap};
}
