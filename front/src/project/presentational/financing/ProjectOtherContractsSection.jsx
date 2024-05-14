import {SectionCard} from "base/ui/section/components";
import {RelatedContractsTable} from "contract/presentational";

const ProjectOtherContractsSection = ({contracts}) => {
    return (
        <SectionCard title="Otros contratos">
            <RelatedContractsTable contracts={contracts} />
        </SectionCard>
    );
};

export default ProjectOtherContractsSection;
