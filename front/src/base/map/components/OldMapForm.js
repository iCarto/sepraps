import {useEffect, useRef} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.utm";
import {useMapIcon} from "base/geo/hooks";

const style = {
    width: "100%",
    height: "300px",
};

const OldMapForm = ({onClick, latitude = null, longitude = null}) => {
    const getIcon = useMapIcon();

    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        mapRef.current = L.map("map", {
            center: [-24, -56],
            zoom: 5,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });
        mapRef.current.on("click", handleClickOnMap);

        return () => {
            mapRef.current.off();
            mapRef.current.remove();
        };
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            if (markerRef.current) {
                mapRef.current.removeLayer(markerRef.current);
            }
            markerRef.current = L.marker(
                {lat: latitude, lng: longitude},
                {icon: getIcon()}
            ).addTo(mapRef.current);
            if (!mapRef.current.getBounds().contains(markerRef.current.getLatLng())) {
                mapRef.current.panTo(markerRef.current.getLatLng(), {animate: true});
            }
        }
    }, [latitude, longitude]);

    const handleClickOnMap = e => {
        onClick(e.latlng);
    };

    return <div id="map" style={style} />;
};

export default OldMapForm;
