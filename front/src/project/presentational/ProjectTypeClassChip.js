import {ProjectTypeIcon} from ".";
import {GenericChip} from "base/shared/components";

const ProjectTypeClassChip = ({projectWorkData}) => {
    return (
        <GenericChip
            icon={<ProjectTypeIcon projectWorkData={projectWorkData} />}
            label={projectWorkData.work_class_label}
        />
    );
};

export default ProjectTypeClassChip;
