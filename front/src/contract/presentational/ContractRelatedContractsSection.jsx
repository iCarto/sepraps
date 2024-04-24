import {SectionCard} from "base/ui/section/components";
import {RelatedContractsTable} from ".";

const ContractRelatedContractsSection = ({contracts}) => {
    return (
        <SectionCard title="Otros contratos">
            <RelatedContractsTable contracts={contracts} />
        </SectionCard>
    );
};

export default ContractRelatedContractsSection;
