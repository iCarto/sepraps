import {FieldUtil} from "base/ui/section/utilities";

export function useProviderData(provider) {
    const entityData = {
        image: provider?.featured_image,
        name: `Prestador ${provider?.name || provider?.id}`,
        sections: [
            {
                head: "Datos generales",
                content: [
                    ["Código:", FieldUtil.getValue(provider?.code)],
                    ["Nombre:", FieldUtil.getValue(provider?.name)],
                ],
            },
        ],
    };

    return {entityData};
}
