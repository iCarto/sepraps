import {SectionCard, SectionField} from "components/common/presentational";

const ContractorSummary = ({contractor}) => {
    return (
        <SectionCard title="Contratista">
            <SectionField label="Nombre:" value={contractor.name} />
            <SectionField label="Tipo:" value={contractor.contractor_type_name} />
            <SectionField label="Teléfono:" value={contractor.phone} />
            <SectionField label="Correo electrónico:" value={contractor.email} />
        </SectionCard>
    );
};

export default ContractorSummary;
