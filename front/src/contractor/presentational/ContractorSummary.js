import {SectionCard, SectionField} from "base/section/components";

const ContractorSummary = ({contractor}) => {
    return (
        <SectionCard title="Contratista">
            <SectionField label="Nombre:" value={contractor.name} />
            <SectionField label="Tipo:" value={contractor.contractor_type_name} />
            <SectionField label="Celular:" value={contractor.phone} />
            <SectionField label="E-mail:" value={contractor.email} />
        </SectionCard>
    );
};

export default ContractorSummary;
