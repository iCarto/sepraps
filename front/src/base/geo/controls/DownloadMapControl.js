import L from "leaflet";
import {useDownloadMapAsPng} from "../hooks/DownloadMapAsPngHook";

export function useDownloadMapControl(mapRef, options = {}) {
    const {
        setConfig: setConfigMapAsPng,
        download: downloadMapAsPng,
    } = useDownloadMapAsPng();

    const ControlButton = L.Control.extend({
        options: {
            position: "topright",
            ...options,
        },
        onAdd: function(map) {
            var container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
            var button = L.DomUtil.create("a", "leaflet-control-button", container);
            button.href = "#";
            L.DomEvent.disableClickPropagation(button);
            L.DomEvent.on(button, "click", function(event) {
                event.preventDefault();
                downloadMapAsPng();
            });

            container.title = "Title";

            return container;
        },
        onRemove: function(map) {
            // Nothing to do here
        },
    });

    const addDownloadMapControl = map => {
        setConfigMapAsPng(map, mapRef.current);
        var control = new ControlButton();
        control.addTo(map);
    };

    return {addDownloadMapControl};
}
