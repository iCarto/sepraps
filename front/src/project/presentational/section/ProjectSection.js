import {SectionCard} from "base/ui/section/components";
import {ProjectSectionFields} from ".";

const ProjectSection = ({project}) => {
    return (
        <SectionCard title={project?.name}>
            <ProjectSectionFields project={project} />
        </SectionCard>
    );
};

export default ProjectSection;
