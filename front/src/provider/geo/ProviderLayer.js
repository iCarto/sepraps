import {CUSTOM_COLORS} from "Theme";
import {useEntityLayer} from "base/entity/hooks";

const getTooltip = feature => {
    let data = feature.properties;
    let tooltip = `<b>${data.name || "---"}</b><ul class="attributes">`;
    tooltip += `<li><i>Localidad</i>: ${data.locality || "---"}</li>`;
    tooltip += `<li><i>Distrito</i>: ${data.locality.district_name || "---"}</li>`;
    tooltip += `<li><i>Departamento</i>: ${data.locality.department_name ||
        "---"}</li>`;
    return tooltip + "</ul>";
};

const getStyle = feature => {
    return {
        fillColor: CUSTOM_COLORS.secondary.dark,
    };
};

export function useProviderLayer(onSelectElement) {
    const entityLayer = useEntityLayer(onSelectElement, getTooltip, getStyle);

    return {...entityLayer};
}
