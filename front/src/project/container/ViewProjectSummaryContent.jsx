import {
    ProjectBasicDataFields,
    ProjectGeneralDataSection,
} from "project/presentational/section";
import {SectionCard} from "base/ui/section/components";

const ViewProjectSummaryContent = ({project}) => {
    return (
        <SectionCard>
            <ProjectGeneralDataSection
                project={project}
                basicDataComponent={<ProjectBasicDataFields project={project} />}
            />
        </SectionCard>
    );
};

export default ViewProjectSummaryContent;
