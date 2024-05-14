import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.utm";
import {useMapIcon} from "base/geo/hooks";

const style = {
    width: "100%",
    height: "300px",
};

const MapInfrastructure = ({infrastructure = null}) => {
    const getIcon = useMapIcon();

    let map;

    const getMapMarkerText = (marker, infrastructure) => {
        let text = `${infrastructure.name}, ${infrastructure.location}`;
        text += `<br/>X: ${Math.trunc(marker.getLatLng().utm().x)}, Y: ${Math.trunc(
            marker.getLatLng().utm().y
        )}`;
        text += `<br/>Altitud: ${
            infrastructure.altitude ? infrastructure.altitude + " m." : ""
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

        if (infrastructure && infrastructure.latitude && infrastructure.longitude) {
            const markerPosition = {
                lat: infrastructure.latitude,
                lng: infrastructure.longitude,
            };
            const marker = L.marker(markerPosition, {icon: getIcon()}).addTo(map);
            map.panTo(marker.getLatLng());

            if (infrastructure.name) {
                marker
                    .bindPopup(getMapMarkerText(marker, infrastructure), {
                        offset: [0, -30],
                    })
                    .openPopup();
            }
        }

        return () => {
            map.off();
            map.remove();
        };
    }, [infrastructure]);

    return <div id="map" style={style} />;
};

export default MapInfrastructure;
