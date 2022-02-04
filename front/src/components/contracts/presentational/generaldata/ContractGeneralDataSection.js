import {useOutletContext} from "react-router-dom";

import {SectionCard, SectionField} from "components/common/presentational";

const ContractGeneralDataSection = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard title="Datos generales">
            <SectionField label="Número:" value={contract.number} />
            <SectionField label="Observaciones:" value={contract.comments} />
        </SectionCard>
    );
};

export default ContractGeneralDataSection;
