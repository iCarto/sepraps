import L from "leaflet";

export function useMapIcon() {
    const getIcon = (color = null) => {
        const markerHtmlStyles = `
    background-color: ${color || "#025eaa"};
    width: 30px;
    height: 30px;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 30px 30px 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

        return L.divIcon({
            className: "map-icon",
            iconAnchor: [-10, 10],
            labelAnchor: [0, 0],
            popupAnchor: [0, 0],
            html: `<span style="${markerHtmlStyles}" />`,
        });
    };

    return getIcon;
}
