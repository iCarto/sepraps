import {CUSTOM_COLORS, theme} from "Theme";
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
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: theme.palette.design.main,
                    },
                },
                {
                    text: "Contratación",
                    filterFn: val => val === "contracting",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: theme.palette.contracting.main,
                    },
                },
                {
                    text: "Ejecución",
                    filterFn: val => val === "execution",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: theme.palette.execution.main,
                    },
                },
                {
                    text: "Post-construcción",
                    filterFn: val => val === "post-execution",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: theme.palette["post-execution"].main,
                    },
                },
                {
                    text: "(sin datos)",
                    filterFn: val => val === null,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: "lightgrey",
                    },
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
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.water_provision,
                    },
                },
                {
                    text: "Agua - Chaco",
                    filterFn: val => val === "agua_lluvia",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.water_provision_rain,
                    },
                },
                {
                    text: "Alcantarillado",
                    filterFn: val => val === "alcantarillado",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.sewerage,
                    },
                },
                {
                    text: "USB",
                    filterFn: val => val === "sanitarios",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.sanitation,
                    },
                },
                {
                    text: "(sin datos)",
                    filterFn: val => val === null,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.other,
                    },
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
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.renovation,
                    },
                },
                {
                    text: "Nueva construcción",
                    filterFn: val => val === "nueva_construccion",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.new_construction,
                    },
                },
                {
                    text: "Ampliación",
                    filterFn: val => val === "ampliacion",
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.expansion,
                    },
                },
                {
                    text: "(sin datos)",
                    filterFn: val => val === null,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.other,
                    },
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
