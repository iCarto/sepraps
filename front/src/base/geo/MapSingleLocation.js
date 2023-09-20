import {useEffect} from "react";
import L from "leaflet";
import {useMap} from ".";

const mapStyle = {
    width: "100%",
    height: "300px",
};

const MapSingleLocation = ({geojson}) => {
    const {mapRef, createMap} = useMap();

    useEffect(() => {
        const map = createMap();

        const geojsonLayer = L.Proj.geoJson(geojson, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 0.3,
                    fillOpacity: 0.8,
                });
            },
        }).addTo(map);

        map.setView(geojsonLayer.getBounds().getCenter(), 14);

        return () => {
            if (map._loaded) {
                map.remove();
            }
        };
    }, []);

    return <div id="map" style={mapStyle} ref={mapRef} />;
};

export default MapSingleLocation;
