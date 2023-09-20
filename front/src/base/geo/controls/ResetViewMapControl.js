import {ResetView} from "../hooks/resetview";

export function useResetViewMapControl(initialLatLng, initialZoom, otherOptions = {}) {
    const addResetViewMapControl = map => {
        new ResetView({
            latlng: initialLatLng,
            zoom: initialZoom,
            title: "Zoom Inicial",
            ...otherOptions,
        }).addTo(map);
    };

    return {addResetViewMapControl};
}
