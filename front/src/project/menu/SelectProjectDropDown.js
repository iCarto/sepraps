import {ProjectService} from "project/service";
import {TEMPLATE} from "contract/service";

import {EntityMenuDropDown} from "base/entity/components/presentational";
import {ProjectTypeClassChip, ProjectTypeClassChips} from "project/presentational";
import {Spinner} from "base/shared/components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const SelectProjectDropDown = ({project}) => {
    const renderDropdownItem = eachProject => {
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

    return project ? (
        <EntityMenuDropDown
            title="Proyecto"
            primary={project?.code}
            secondary={project ? `${project?.name}, ${project?.location}` : null}
            tag={
                <>
                    <ProjectTypeClassChips projectWorks={project?.project_works} />
                    {project?.closed && (
                        <Chip size="small" label="Archivado" color="error" />
                    )}
                </>
            }
            basePath={"/projects/list"}
            service={ProjectService.getListSummary}
            template={TEMPLATE.SHORT}
            renderDropdownItem={renderDropdownItem}
        />
    ) : (
        <Spinner small />
    );
};

export default SelectProjectDropDown;
