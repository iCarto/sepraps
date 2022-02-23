import {SectionCard, SectionField} from "components/common/presentational";
import {DateUtil} from "utilities";

const MilestoneSection = ({milestone}) => {
    return (
        milestone && (
            <SectionCard title="Detalle del hito">
                <SectionField
                    label="Categoría:"
                    value={milestone.category_name}
                    containerWidth="short"
                />
                <SectionField
                    label="Fecha de cumplimiento:"
                    value={DateUtil.formatDate(milestone.compliance_date)}
                    containerWidth="short"
                />
            </SectionCard>
        )
    );
};

export default MilestoneSection;
