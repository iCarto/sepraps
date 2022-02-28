import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {useMapIcon} from "./hooks/MapIconHook";

const style = {
    width: "100%",
    height: "300px",
};

const Map = ({onClick, markerPosition = null}) => {
    const getIcon = useMapIcon();

    let map;
    let marker;

    useEffect(() => {
        map = L.map("map", {
            center: [-24, -56],
            zoom: 5,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });
        map.on("click", setMarker);

        return () => {
            map.off();
            map.remove();
        };
    }, [markerPosition]);

    const setMarker = e => {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng, {icon: getIcon()}).addTo(map);
        onClick(e.latlng.lat, e.latlng.lng);
    };

    return <div id="map" style={style} />;
};

export default Map;
