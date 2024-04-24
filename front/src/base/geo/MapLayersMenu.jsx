import {ImageOverlayLayer, TileLayer} from "./layer";
import {LayerMenu, TileLayerMenu} from ".";
import {MapMenu} from "./menu";

const MapLayersMenu = ({layerProvider}) => {
    const getLayerItem = (layerProvider, index) => {
        if (
            layerProvider.layer instanceof TileLayer ||
            layerProvider.layer instanceof ImageOverlayLayer
        ) {
            return <TileLayerMenu key={index} layerProvider={layerProvider} />;
        }
        return <LayerMenu key={index} layerProvider={layerProvider} />;
    };

    return <MapMenu>{getLayerItem(layerProvider, 0)}</MapMenu>;
};

export default MapLayersMenu;
