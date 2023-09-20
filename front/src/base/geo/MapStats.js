import {useEffect} from "react";
import L from "leaflet";
import {useMap} from ".";

const mapStyle = {
    width: "100%",
    height: "600px",
};

const getTooltip = (feature, attribute, attributeLabel) => {
    let data = feature.properties;
    let tooltip = `<b>Concello: ${data.concello_label}</b><ul class="attributes">`;
    tooltip += `<li><i>${attributeLabel}</i>: ${
        data[attribute] ? data[attribute] : "---"
    }</li>`;
    return tooltip + "</ul>";
};

const getStyle = (feature, fillColor) => {
    let item = feature.properties;
    const color = typeof fillColor === "function" ? fillColor(item) : fillColor;
    return {
        fillColor: color,
        weight: 1,
        opacity: 1,
        color: "white",
        fillOpacity: 1,
    };
};

const MapStats = ({
    geojson,
    attribute,
    attributeLabel,
    legendItems,
    fillColor = null,
}) => {
    const {mapRef, createMap} = useMap(false);

    useEffect(() => {
        const map = createMap();

        const geojsonLayer = L.Proj.geoJson(geojson, {
            onEachFeature: (feature, layer) => {
                layer.bindTooltip(getTooltip(feature, attribute, attributeLabel));
            },
            style: feature => getStyle(feature, fillColor),
        }).addTo(map);

        var legend = L.control({position: "bottomleft"});

        legend.onAdd = function(map) {
            var div = L.DomUtil.create("div", "legend");
            div.innerHTML += `<h4>${attributeLabel}</h4>`;
            legendItems.forEach(legendItem => {
                div.innerHTML += `<i style="background: ${legendItem.color}"></i><span>${legendItem.label}</span><br>`;
            });
            return div;
        };
        legend.addTo(map);

        if (geojson) {
            map.fitBounds(geojsonLayer.getBounds());
        }

        //map.setView(geojsonLayer.getBounds().getCenter(), 5);

        return () => {
            if (map._loaded) {
                map.remove();
            }
        };
    }, []);

    return <div id="map" style={mapStyle} ref={mapRef} />;
};

export default MapStats;
