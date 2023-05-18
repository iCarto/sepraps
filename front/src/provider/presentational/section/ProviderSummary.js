import {SectionCard, SectionField} from "base/ui/section/components";

const ProviderSummary = ({provider}) => {
    return (
        <SectionCard title="Prestador">
            <SectionField label="Nombre" value={provider.name} />
            <SectionField
                label="Ubicación"
                value={`${provider.locality.name}, ${provider.locality.department_name} (${provider.locality.district_name})`}
            />
        </SectionCard>
    );
};

export default ProviderSummary;
