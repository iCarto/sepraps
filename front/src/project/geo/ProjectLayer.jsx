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
    FINANCIAL_PROGRESS: "financial_progress_percentage",
    PHYSICAL_PROGRESS: "physical_progress_percentage",
    CONNECTIONS_PROGRESS: "percentage_of_connections",
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
            getValueFn: feature =>
                feature.properties.project_works?.map(
                    project_work => project_work.work_type
                ),
            entries: [
                {
                    text: "Agua potable",
                    filterFn: val => val.includes("agua"),
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.water_provision,
                    },
                },
                {
                    text: "Agua - Chaco",
                    filterFn: val => val.includes("agua_lluvia"),
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.water_provision_rain,
                    },
                },
                {
                    text: "Alcantarillado",
                    filterFn: val => val.includes("alcantarillado"),
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.sewerage,
                    },
                },
                {
                    text: "USB",
                    filterFn: val => val.includes("sanitarios"),
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_type.sanitation,
                    },
                },
                {
                    text: "(sin datos)",
                    filterFn: val => !val,
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
            getValueFn: feature =>
                feature.properties.project_works?.map(
                    project_work => project_work.work_class
                ),
            entries: [
                {
                    text: "Mejora",
                    filterFn: val => val.includes("mejora"),
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.renovation,
                    },
                },
                {
                    text: "Nueva construcción",
                    filterFn: val => val.includes("nueva_construccion"),
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.new_construction,
                    },
                },
                {
                    text: "Ampliación",
                    filterFn: val => val.includes("ampliacion"),
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.expansion,
                    },
                },
                {
                    text: "(sin datos)",
                    filterFn: val => !val,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.project_class.other,
                    },
                },
            ],
        },
        {
            field: discriminators.FINANCIAL_PROGRESS,
            text: "% Avance financiero",
            defaultIconOptions: markerBaseOptions,
            entries: [
                {
                    text: "0% - 24%",
                    filterFn: val => parseInt(val) < 25,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.under25,
                    },
                },
                {
                    text: "25% - 49%",
                    filterFn: val => parseInt(val) < 50,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from25to50,
                    },
                },
                {
                    text: "50% - 74%",
                    filterFn: val => parseInt(val) < 75,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from50to75,
                    },
                },
                {
                    text: "75% - 99%",
                    filterFn: val => parseInt(val) < 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from75to100,
                    },
                },
                {
                    text: "100%",
                    filterFn: val => parseInt(val) === 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.completed,
                    },
                },
                {
                    text: "> 100%",
                    filterFn: val => parseInt(val) > 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.overcompleted,
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
            field: discriminators.PHYSICAL_PROGRESS,
            text: "% Avance físico",
            defaultIconOptions: markerBaseOptions,
            entries: [
                {
                    text: "0% - 24%",
                    filterFn: val => parseInt(val) < 25,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.under25,
                    },
                },
                {
                    text: "25% - 49%",
                    filterFn: val => parseInt(val) < 50,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from25to50,
                    },
                },
                {
                    text: "50% - 74%",
                    filterFn: val => parseInt(val) < 75,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from50to75,
                    },
                },
                {
                    text: "75% - 99%",
                    filterFn: val => parseInt(val) < 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from75to100,
                    },
                },
                {
                    text: "100%",
                    filterFn: val => parseInt(val) === 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.completed,
                    },
                },
                {
                    text: "> 100%",
                    filterFn: val => parseInt(val) > 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.overcompleted,
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
            field: discriminators.CONNECTIONS_PROGRESS,
            text: "% Conexiones ejecutadas",
            defaultIconOptions: markerBaseOptions,
            entries: [
                {
                    text: "0% - 24%",
                    filterFn: val => parseInt(val) < 25,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.under25,
                    },
                },
                {
                    text: "25% - 49%",
                    filterFn: val => parseInt(val) < 50,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from25to50,
                    },
                },
                {
                    text: "50% - 74%",
                    filterFn: val => parseInt(val) < 75,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from50to75,
                    },
                },
                {
                    text: "75% - 99%",
                    filterFn: val => parseInt(val) < 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.from75to100,
                    },
                },
                {
                    text: "100%",
                    filterFn: val => parseInt(val) >= 100,
                    markerOptions: {
                        ...markerBaseOptions,
                        fillColor: CUSTOM_COLORS.percentages.completed,
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
            tooltip += `<li><i>Trabajos</i>: ${
                data["project_works"]
                    ? data["project_works"]
                          .map(
                              project_work =>
                                  `${project_work.work_type_label} - ${project_work.work_class_label}`
                          )
                          .join(", ")
                    : "---"
            }</li>`;
            tooltip += `<li><i>%Avance financiero</i>: ${
                data["financial_progress_percentage"]
                    ? `${parseInt(data["financial_progress_percentage"])}%`
                    : "---"
            }</li>`;
            tooltip += `<li><i>%Avance físico</i>: ${
                data["physical_progress_percentage"]
                    ? `${parseInt(data["physical_progress_percentage"])}%`
                    : "---"
            }</li>`;
            tooltip += `<li><i>%Conexiones ejecutadas</i>: ${
                data["percentage_of_connections"]
                    ? `${parseInt(data["percentage_of_connections"])}%`
                    : "---"
            }</li>`;
            return tooltip + "</ul>";
        },
        // TODO next methods are necessary for map inside EntityListMap
        // We have to design this component without repeating if is from EntityListMap or MapProvider
        defaultOnClick: ({feature}) => onSelectElement(feature.id),
    });
}
