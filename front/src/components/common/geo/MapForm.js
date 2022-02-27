import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const style = {
    width: "100%",
    height: "300px",
};

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 43],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({onClick, markerPosition = null}) => {
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
        marker = L.marker(e.latlng).addTo(map);
        onClick(e.latlng.lat, e.latlng.lng);
    };

    return <div id="map" style={style} />;
};

export default Map;
