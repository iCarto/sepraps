import {useRef} from "react";
import L from "leaflet";
// import {mapOverlayPanes} from "base/component/geo";

const markerBaseStyle = {
    fillColor: "orange",
    radius: 7,
    color: "white",
    weight: 0,
    opacity: 1,
    fillOpacity: 0.9,
    // pane: mapOverlayPanes[4],
};

const getStyle = (style, selected = false) => {
    const markerStyle = {...markerBaseStyle, ...style};
    return !selected
        ? markerStyle
        : {
              ...markerStyle,
              fillColor: markerStyle.color,
              color: markerStyle.fillColor,
              weight: 3,
          };
};

const getMarker = (feature, latlng, style, selected = false) => {
    return new L.CircleMarker(latlng, getStyle(style, selected));
};

export function useEntityLayer(onSelectElement, getTooltip, style = {}) {
    const layerRef = useRef(L.layerGroup());
    const mapRef = useRef(null);
    const geojsonLayersRef = useRef({});
    const selectedIdRef = useRef(null);

    const createLayer = map => {
        map.removeLayer(layerRef.current);
        layerRef.current.addTo(map);
        mapRef.current = map;
    };

    const updateLayer = (geojson, detail) => {
        layerRef.current.clearLayers();

        const geojsonLayer = L.Proj.geoJson(geojson, {
            onEachFeature: function(feature, layer) {
                geojsonLayersRef.current[feature.id] = layer;
                if (!detail) {
                    layer.bindTooltip(getTooltip(feature));
                    layer.on({
                        click: () => {
                            if (onSelectElement) {
                                onSelectElement(feature.id);
                            }
                        },
                    });
                }
            },
            pointToLayer: (feature, latlng) => {
                let isSelected =
                    selectedIdRef.current !== null &&
                    feature.id === selectedIdRef.current;
                return getMarker(feature, latlng, style, isSelected);
            },
        }).addTo(layerRef.current);

        /*if (detail) {
            mapRef.current.fitBounds(geojsonLayer.getBounds());
        }*/
    };

    const clearLayer = () => {
        layerRef.current.clearLayers();
    };

    const changeSelectedElement = newSelectedElement => {
        if (
            selectedIdRef.current !== null &&
            geojsonLayersRef.current[selectedIdRef.current]
        ) {
            let marker = geojsonLayersRef.current[selectedIdRef.current];
            marker.setStyle(getStyle(style, false));
        }
        if (newSelectedElement) {
            if (newSelectedElement === selectedIdRef.current) {
                return;
            }
            selectedIdRef.current = newSelectedElement;
            if (
                selectedIdRef.current !== null &&
                geojsonLayersRef.current[selectedIdRef.current]
            ) {
                let marker = geojsonLayersRef.current[selectedIdRef.current];
                marker.setStyle(getStyle(style, true));
            }
        }
    };

    return {layerRef, createLayer, updateLayer, clearLayer, changeSelectedElement};
}
