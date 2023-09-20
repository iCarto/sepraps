import {useEffect} from "react";
import L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import {useMap} from ".";

const mapStyle = {
    width: "100%",
    height: "300px",
};

const MapPolygonForm = ({geom, layer: layerHook, onLayerUpdated}) => {
    const {mapRef, createMap} = useMap();
    console.log({geom});

    const {createLayer, updateLayer, clearLayer} = layerHook();

    useEffect(() => {
        const map = createMap();
        createLayer(map);

        L.drawLocal.draw.toolbar.buttons.polygon = "Dibujar un polígono";

        var editableLayers = new L.FeatureGroup(geom);

        var drawPluginOptions = {
            position: "topleft",
            draw: {
                polygon: {
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        color: "#e1e100", // Color the shape will turn when intersects
                        message: "No puedes realizar intersecciones", // Message that will show when intersect
                    },
                    shapeOptions: {
                        color: "#97009c",
                    },
                },
                // disable toolbar item by setting it to false
                polyline: false,
                circle: false, // Turns off this drawing tool
                rectangle: false,
                marker: false,
                circlemarker: false,
            },
            edit: {
                featureGroup: editableLayers,
                poly: {
                    allowIntersection: false,
                },
            },
        };

        // Initialise the draw control and pass it the FeatureGroup of editable layers
        var drawControl = new L.Control.Draw(drawPluginOptions);
        map.addControl(drawControl);

        map.addLayer(editableLayers);

        map.on("draw:created", e => {
            const layer = e.layer;
            editableLayers.addLayer(layer);
            console.log("created", editableLayers.toGeoJSON());
            onLayerUpdated(editableLayers.toGeoJSON());
        });

        map.on("draw:edited", e => {
            const layer = e.layer;
            editableLayers.addLayer(layer);
            console.log("edited", editableLayers.toGeoJSON());
            onLayerUpdated(editableLayers.toGeoJSON());
        });

        if (geom) {
            let geojsonLayer;
            if (geom.type === "MultiPolygon") {
                geom.coordinates.forEach(polygonCoords => {
                    var polygon = {type: "Polygon", coordinates: polygonCoords};
                    L.geoJson(polygon, {
                        onEachFeature: (feature, layer) => {
                            editableLayers.addLayer(layer);
                        },
                    });
                });
            } else {
                geojsonLayer = L.geoJSON(geom);
                editableLayers.addLayer(geojsonLayer);
            }
            map.fitBounds(editableLayers.getBounds(), {padding: [10, 100]});
        }

        return () => {
            if (map._loaded) {
                map.remove();
            }
        };
    }, []);

    return <div id="map" style={mapStyle} ref={mapRef} />;
};

export default MapPolygonForm;
