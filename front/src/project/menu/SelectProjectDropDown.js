import {EntityMenuDropDown} from "base/entity/components/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SelectProjectDropDown = ({project, headingTag = null}) => {
    const getDropdownItemContent = eachProject => {
        return (
            <Stack>
                <Typography>{eachProject.name}</Typography>
                <Typography variant="caption" sx={{ml: 1}}>
                    {`${eachProject.code}, ${eachProject.location}`}
                    {eachProject.closed && " - ARCHIVADO"}
                </Typography>
            </Stack>
        );
    };

    return (
        <EntityMenuDropDown
            currentItem={project}
            urlPrimarySlug="projects"
            entityPrimaryInfo={project?.code}
            entitySecondaryInfo={`${project?.name}, ${project?.location}`}
            headingSecondaryText="Proyecto:"
            headingTag={headingTag}
            getDropdownItemContent={getDropdownItemContent}
        />
    );
};

export default SelectProjectDropDown;
