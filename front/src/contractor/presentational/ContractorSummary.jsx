import {SectionCard, SectionField} from "base/ui/section/components";
import {ContractorGeneralDataSection} from "./section";

const ContractorSummary = ({contractor}) => {
    return (
        <SectionCard title="Contratista">
            <ContractorGeneralDataSection contractor={contractor} />
        </SectionCard>
    );
};

export default ContractorSummary;
