import {SectionCard, SectionField} from "base/ui/section/components";

const ProviderSummary = ({provider}) => {
    return (
        <SectionCard title="Prestador">
            <SectionField label="Nombre" value={provider.name} />
            <SectionField label="Tipo" value={`${provider.type_label}`} />
            <SectionField
                label="Legalmente constituida"
                value={`${provider.is_legalized_label}`}
            />
        </SectionCard>
    );
};

export default ProviderSummary;
