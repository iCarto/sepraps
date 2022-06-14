import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.utm";

import {useMapIcon} from "./hooks/MapIconHook";

const style = {
    width: "100%",
    height: "300px",
};

const MapInfraestructure = ({infraestructure = null}) => {
    const getIcon = useMapIcon();

    let map;

    const getMapMarkerText = (marker, infraestructure) => {
        let text = `${infraestructure.name}, ${infraestructure.location}`;
        text += `<br/>X: ${Math.trunc(marker.getLatLng().utm().x)}, Y: ${Math.trunc(
            marker.getLatLng().utm().y
        )}`;
        text += `<br/>Altitud: ${
            infraestructure.altitude ? infraestructure.altitude + " m." : ""
        }`;
        return text;
    };

    useEffect(() => {
        map = L.map("map", {
            center: [-24, -56],
            zoom: 12,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });

        if (infraestructure && infraestructure.latitude && infraestructure.longitude) {
            const markerPosition = {
                lat: infraestructure.latitude,
                lng: infraestructure.longitude,
            };
            const marker = L.marker(markerPosition, {icon: getIcon()}).addTo(map);
            map.panTo(marker.getLatLng());

            if (infraestructure.name) {
                marker
                    .bindPopup(getMapMarkerText(marker, infraestructure), {
                        offset: [0, -30],
                    })
                    .openPopup();
            }
        }

        return () => {
            map.off();
            map.remove();
        };
    }, [infraestructure]);

    return <div id="map" style={style} />;
};

export default MapInfraestructure;
