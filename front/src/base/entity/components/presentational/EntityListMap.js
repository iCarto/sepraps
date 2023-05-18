import {useEffect} from "react";
import {useList} from "base/entity/hooks";
import {useMap} from "base/map/hooks";
import {useMapLayerProvider} from "base/map/provider";

const mapStyle = {
    width: "100%",
    height: "650px",
};

const EntityListMap = ({
    layer: layerHook,
    service,
    selectedElement = null,
    onSelectElement = null,
}) => {
    const [{setItems, items}] = useMapLayerProvider(service);
    const {filter, setSize} = useList();

    const {mapRef, createMap} = useMap();

    const {createLayer, updateLayer, clearLayer, changeSelectedElement} = layerHook(
        onSelectElement
    );

    useEffect(() => {
        const map = createMap();
        createLayer(map);

        return () => {
            if (map._loaded) {
                map.remove();
            }
        };
    }, []);

    useEffect(() => {
        service.getAll(filter).then(result => {
            setItems(result);
            // setSize(result.features.length);
            setSize(result?.length);
        });
    }, [filter]);

    useEffect(() => {
        clearLayer();
        updateLayer(items, false, true);
    }, [items]);

    useEffect(() => {
        changeSelectedElement(selectedElement);
    }, [selectedElement]);

    return <div id="map" style={mapStyle} ref={mapRef} />;
};

export default EntityListMap;
