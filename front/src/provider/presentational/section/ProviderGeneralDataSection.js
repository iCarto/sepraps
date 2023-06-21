import {NumberUtil} from "base/format/utilities";
import {EntityGeneralDataSection} from "base/entity/components/presentational/sections";

const ProviderGeneralDataSection = ({provider}) => {
    const sections = [
        {label: "Área", value: provider.area_label},
        {
            label: "Nº miembros de la Comisión Directiva",
            value: NumberUtil.formatInteger(provider.number_of_members),
        },
        {
            label: "Nº mujeres de la Comisión Directiva",
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
