import L from "leaflet";
import "leaflet-coord-projection/coord-projection.js";
import "leaflet-coord-projection/coord-projection.css";
import "./mycoord-projection.css";

export function useCoordinatesMapControl() {
    const addCoordinatesMapControl = map => {
        L.control
            .coordProjection({
                emptyString: `${map.getCenter().lat} | ${map.getCenter().lng}`,
            })
            .addTo(map);
    };

    return {addCoordinatesMapControl};
}
