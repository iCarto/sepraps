import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {useMapIcon} from "./hooks/MapIconHook";

const style = {
    width: "100%",
    height: "300px",
};

const Map = ({markerPosition, text = null}) => {
    const getIcon = useMapIcon();

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
        const marker = L.marker(markerPosition, {icon: getIcon()}).addTo(map);

        return () => {
            map.off();
            map.remove();
        };
    }, [markerPosition]);

    return <div id="map" style={style} />;
};

export default Map;
