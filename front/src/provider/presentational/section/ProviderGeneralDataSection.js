import {NumberUtil} from "base/format/utilities";
import {EntityGeneralDataSection} from "base/entity/components/presentational/sections";

const ProviderGeneralDataSection = ({provider}) => {
    const sections = [
        {
            label: "Nombre",
            value: provider.name,
        },
        {label: "Área", value: provider.area_label},
        {
            label: "Nº miembros",
            value: NumberUtil.formatInteger(provider.number_of_members),
        },
        {
            label: "Nº mujeres",
            value: NumberUtil.formatInteger(provider.number_of_women),
        },
    ];

    return (
        <EntityGeneralDataSection
            featured_document={provider.featured_document}
            name={provider.name}
            sections={sections}
        />
    );
};

export default ProviderGeneralDataSection;
