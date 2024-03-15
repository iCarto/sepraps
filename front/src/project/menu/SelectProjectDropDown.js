import {theme} from "Theme";
import {ProjectService} from "project/service";
import {TEMPLATE} from "contract/service";

import {EntityMenuDropDown} from "base/entity/components/presentational";
import {ProjectTypeIcon} from "project/presentational";
import {Spinner} from "base/shared/components";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const iconBoxStyle = {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: `solid 2px ${theme.palette.primary.dark}`,
    bgcolor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

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
                    <Stack direction="row">
                        {project?.project_works.map((project_work, index) => (
                            <Box
                                sx={{
                                    ...iconBoxStyle,
                                    ml: index !== 0 ? -1 : 0,
                                    opacity: 0.85,
                                }}
                            >
                                <ProjectTypeIcon
                                    projectWorkData={project_work}
                                    size="small"
                                />
                            </Box>
                        ))}
                    </Stack>
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
