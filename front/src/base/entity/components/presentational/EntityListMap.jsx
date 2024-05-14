import Stack from "@mui/material/Stack";
import {useList} from "base/entity/hooks";
import {MapActions, useMap, useMapLayerProvider} from "base/geo";
import MapLayersMenu from "base/geo/MapLayersMenu";
import {useMapConfig} from "base/geo/provider";
import {useEffect, useRef} from "react";

const mapStyle = {
    width: "100%",
    height: "650px",
};

const EntityListMap = ({
    service,
    layerHook,
    layerDefaultDiscriminator = null,
    onSelectElement = null,
    selectedElement = null,
    customLoader = null,
}) => {
    const {filter} = useList();
    const {mapFilter, setMapFilter} = useMapConfig();

    const {mapRef, createMap} = useMap();
    const mapObjectRef = useRef(null);

    const layer = layerHook(onSelectElement);
    const [layerMapProvider] = useMapLayerProvider(service, layer, {
        discriminator: layerDefaultDiscriminator,
        included: true,
        customLoader: customLoader,
    });

    useEffect(() => {
        const map = createMap();
        layer.createLayer(map);
        mapObjectRef.current = map;

        return () => {
            if (map._loaded) {
                map.remove();
            }
        };
    }, []);

    layerMapProvider.useProvider();

    useEffect(() => {
        console.log("selectedElement", {selectedElement});
        // TODO Changes not reflected in map because useProvider() (from useMapLayerProvider) is not listening
        /*if (setSelectedIds) {
            setSelectedIds([selectedElement]);
        }*/
    }, [selectedElement]);

    // And this component have to check changes in moduleFilter to update mapFilter
    useEffect(() => {
        const newMapFilter = {...mapFilter, ...filter};

        // Compare objects to avoid duplicate calls with same filter
        if (JSON.stringify(mapFilter) !== JSON.stringify(newMapFilter)) {
            setMapFilter({...mapFilter, ...filter});
        }
    }, [filter]);

    return (
        <Stack direction="row" sx={{width: "100%"}}>
            <div id="map" style={mapStyle} ref={mapRef} />
            <Stack>
                <MapActions
                    mapObjectRef={mapObjectRef}
                    mapRef={mapRef}
                    showMapActions={true}
                />
                <MapLayersMenu layerProvider={layerMapProvider} />
            </Stack>
        </Stack>
    );
};

export default EntityListMap;
