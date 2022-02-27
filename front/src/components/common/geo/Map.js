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
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({markerPosition, text}) => {
    let map;

    useEffect(() => {
        map = L.map("map", {
            center: [markerPosition.lat, markerPosition.lng],
            zoom: 12,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });
        const marker = L.marker(markerPosition).addTo(map);
        marker.bindTooltip(text).openTooltip();

        return () => {
            map.off();
            map.remove();
        };
    }, [markerPosition]);

    return <div id="map" style={style} />;
};

export default Map;
