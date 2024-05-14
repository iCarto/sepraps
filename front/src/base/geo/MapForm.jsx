import {useEffect} from "react";
import {useMap} from ".";

const mapStyle = {
    width: "100%",
    height: "300px",
};

const MapForm = ({geom, layer: layerHook, onClick}) => {
    const {mapRef, createMap} = useMap();

    const {createLayer, updateLayer, clearLayer} = layerHook();

    useEffect(() => {
        const map = createMap();
        createLayer(map);

        map.on("click", handleClickOnMap);

        return () => {
            if (map._loaded) {
                map.remove();
            }
        };
    }, []);

    useEffect(() => {
        clearLayer();
        if (geom) {
            updateLayer(geom, true);
        }
    }, [geom]);

    const handleClickOnMap = e => {
        onClick(e.latlng);
    };

    return <div id="map" style={mapStyle} ref={mapRef} />;
};

export default MapForm;
