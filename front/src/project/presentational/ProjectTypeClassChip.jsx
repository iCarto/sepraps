import {GenericChip} from "base/shared/components";

export const PROJECT_TYPE_ICONS = {
    agua: "https://cdn-icons-png.flaticon.com/512/292/292962.png",
    agua_lluvia: "https://cdn-icons-png.flaticon.com/512/3871/3871408.png",
    alcantarillado: "https://cdn-icons-png.flaticon.com/512/3399/3399239.png",
    sanitarios: "https://cdn-icons-png.flaticon.com/512/2452/2452227.png",
    default: "https://cdn-icons-png.flaticon.com/512/57/57108.png",
};

const getAvatarText = workTypeLabel => {
    return workTypeLabel.split(/\s/).reduce(function (accumulator, word) {
        return accumulator + word.charAt(0);
    }, "");
};

const ProjectTypeClassChip = ({projectWorkData}) => {
    return (
        <GenericChip
            iconSrc={
                PROJECT_TYPE_ICONS[projectWorkData.work_type]
                    ? PROJECT_TYPE_ICONS[projectWorkData.work_type]
                    : null
            }
            avatarText={getAvatarText(projectWorkData.work_type_label)}
            tooltipText={projectWorkData.work_type_label}
            label={projectWorkData.work_class_label}
        />
    );
};

export default ProjectTypeClassChip;
