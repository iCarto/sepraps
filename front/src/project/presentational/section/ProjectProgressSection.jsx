import {NumberUtil} from "base/format/utilities";
import {SectionCard} from "base/ui/section/components";
import {ProgressBarSmall} from "base/progress/components";

const ProjectProgressSection = ({project}) => {
    return (
        <SectionCard title="Progreso">
            <ProgressBarSmall
                label="Financiero"
                progressValue={NumberUtil.formatDecimalWithoutZeros(
                    project.financial_progress_percentage
                )}
                progressStyle={{mb: 1}}
            />
            <ProgressBarSmall
                label="Físico"
                progressValue={NumberUtil.formatDecimalWithoutZeros(
                    project.physical_progress_percentage
                )}
            />
        </SectionCard>
    );
};

export default ProjectProgressSection;
