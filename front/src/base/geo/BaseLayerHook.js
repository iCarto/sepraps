import {useRef} from "react";
import L from "leaflet";
import {useCRS} from "./CRSHook";

export const availableBaseLayers = [
    {
        code: "osm",
        name: "OpenStreetMap",
        isWms: false,
        url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
        options: {
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        },
    },
    {
        code: "opentopomap",
        name: "OpenTopoMap",
        isWms: false,
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        options: {
            attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
    },
];

export function useBaseLayer() {
    let layerRef = useRef(null);
    const {crs} = useCRS();

    const getTileLayer = layer => {
        if (layer.isWms) {
            return L.tileLayer.wms(layer.url, {
                ...layer.options,
                crs: layer.useAppCRS ? crs : null,
            });
        } else {
            return L.tileLayer(layer.url, {
                ...layer.options,
            });
        }
    };

    const setBaseLayer = (map, baseLayer) => {
        if (map) {
            if (layerRef.current) {
                map.removeLayer(layerRef.current);
            }
            layerRef.current = getTileLayer(baseLayer).addTo(map);
        }
    };

    return {layerRef, setBaseLayer};
}
