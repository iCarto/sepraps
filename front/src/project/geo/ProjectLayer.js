import {mapOverlayPanes} from "base/geo";
import {createLayerLegend, useLayerObject} from "base/geo/layer";

const markerBaseOptions = {
    marker: "H",
    fillColor: "white",
    radius: 10,
    color: "#7D3642 ",
    addStroke: true,
    strokeColor: "darkgray",
    weight: 1,
    opacity: 1,
    fillOpacity: 1,
    pane: mapOverlayPanes[5],
};

export const discriminators = Object.freeze({
    STATUS: "status",
    PROJECT_TYPE: "project_type",
    PROJECT_CLASS: "project_class",
});

export const LayerLegend = createLayerLegend({
    layerName: "Proyectos",
    menuIconShape: markerBaseOptions.marker,
    discriminatorsAttributes: discriminators,
    discriminatorsLegends: [
        {
            field: discriminators.STATUS,
            text: "Estado",
            defaultIconOptions: markerBaseOptions,
            entries: [
                {
                    text: "Diseño",
                    filterFn: val => val === "design",
                    markerOptions: {...markerBaseOptions, fillColor: "#ff9800"},
                },
                {
                    text: "Contratación",
                    filterFn: val => val === "contracting",
                    markerOptions: {...markerBaseOptions, fillColor: "#fdd835"},
                },
                {
                    text: "Ejecución",
                    filterFn: val => val === "execution",
                    markerOptions: {...markerBaseOptions, fillColor: "#e3eb90"},
                },
                {
                    text: "Post-construcción",
                    filterFn: val => val === "post-execution",
                    markerOptions: {...markerBaseOptions, fillColor: "#8bc34a"},
                },
                {
                    text: "(sin datos)",
                    filterFn: val => val === null,
                    markerOptions: {...markerBaseOptions, fillColor: "lightgrey"},
                },
            ],
        },
        {
            field: discriminators.PROJECT_TYPE,
            text: "Tipo de proyecto",
            defaultIconOptions: markerBaseOptions,
            entries: [
                {
                    text: "Agua potable",
                    filterFn: val => val === "agua",
                    markerOptions: {...markerBaseOptions, fillColor: "#5383cf"},
                },
                {
                    text: "Alcantarillado",
                    filterFn: val => val === "alcantarillado",
                    markerOptions: {...markerBaseOptions, fillColor: "#cf9f53"},
                },
                {
                    text: "USB",
                    filterFn: val => val === "sanitarios",
                    markerOptions: {...markerBaseOptions, fillColor: "#36ad57"},
                },
                {
                    text: "(sin datos)",
                    filterFn: val => val === null,
                    markerOptions: {...markerBaseOptions, fillColor: "lightgrey"},
                },
            ],
        },
        {
            field: discriminators.PROJECT_CLASS,
            text: "Clase de proyecto",
            defaultIconOptions: markerBaseOptions,
            entries: [
                {
                    text: "Mejora",
                    filterFn: val => val === "mejora",
                    markerOptions: {...markerBaseOptions, fillColor: "#9ead36"},
                },
                {
                    text: "Nueva construcción",
                    filterFn: val => val === "nueva_construccion",
                    markerOptions: {...markerBaseOptions, fillColor: "#6cd98a"},
                },
                {
                    text: "Ampliación",
                    filterFn: val => val === "ampliacion",
                    markerOptions: {...markerBaseOptions, fillColor: "#c7923e"},
                },
                {
                    text: "(sin datos)",
                    filterFn: val => val === null,
                    markerOptions: {...markerBaseOptions, fillColor: "lightgrey"},
                },
            ],
        },
    ],
});

export function useProjectLayer(onSelectElement) {
    return useLayerObject({
        legend: LayerLegend,
        detail: false,
        getTooltip: ({feature}) => {
            let data = feature.properties;
            let tooltip = `<b>Proyecto: ${
                data["code"] ? data["code"] : "---"
            }</b><ul class="attributes">`;
            tooltip += `<li><i>Localidad</i>: ${
                data["name"] ? data["name"] : "---"
            }</li>`;
            return tooltip + "</ul>";
        },
        // TODO next methods are necessary for map inside EntityListMap
        // We have to design this component without repeating if is from EntityListMap or MapProvider
        defaultOnClick: ({feature}) => onSelectElement(feature.id),
    });
}
