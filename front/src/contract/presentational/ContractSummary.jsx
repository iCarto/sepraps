import {SectionCard} from "base/ui/section/components";
import {ContractSummaryFields} from ".";

const ContractSummary = ({contract}) => {
    return (
        <SectionCard title="Contrato de obras">
            <ContractSummaryFields contract={contract} />
        </SectionCard>
    );
};

export default ContractSummary;
