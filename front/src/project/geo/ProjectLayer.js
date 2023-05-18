import {CUSTOM_COLORS} from "Theme";
import {useEntityLayer} from "base/entity/hooks";

const getTooltip = feature => {
    let data = feature.properties;
    let tooltip = `<b>${data.name || "---"}</b><ul class="attributes">`;
    tooltip += `<li><i>Ubicación</i>: ${data.location || "---"}</li>`;
    tooltip += `<li><i>Descripción</i>: ${data.description || "---"}</li>`;
    return tooltip + "</ul>";
};

const getStyle = feature => {
    return {
        fillColor: CUSTOM_COLORS.secondary.dark,
    };
};

export function useProjectLayer(onSelectElement) {
    const entityLayer = useEntityLayer(onSelectElement, getTooltip, getStyle);

    return {...entityLayer};
}
