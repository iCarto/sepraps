import {SectionCard, SectionField} from "components/common/presentational";
import {DateUtil} from "utilities";

const MilestoneSection = ({milestone}) => {
    return (
        milestone && (
            <SectionCard title="Detalle del hito">
                <SectionField label="Categoría:" value={milestone.category_name} />
                <SectionField
                    label="Fecha de cumplimiento:"
                    value={DateUtil.formatDate(milestone.compliance_date)}
                />
            </SectionCard>
        )
    );
};

export default MilestoneSection;
