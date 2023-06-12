import {ProjectService} from "project/service";
import {EntityMenuDropDown} from "base/entity/components/presentational";
import {ClosedProjectTag} from "project/presentational";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {TEMPLATE} from "contract/service";

const SelectProjectDropDown = ({project}) => {
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

    console.log(project);

    const entityInfo = project
        ? {
              id: project?.id,
              title: "Proyecto:",
              slug: "projects",
              primaryInfo: project?.code,
              secondaryInfo: `${project?.name}, ${project?.location}`,
              tag: project?.closed ? <ClosedProjectTag /> : null,
          }
        : null;

    return (
        <EntityMenuDropDown
            entityInfo={entityInfo}
            service={ProjectService.getAll}
            template={TEMPLATE.SHORT}
            getDropdownItemContent={getDropdownItemContent}
        />
    );
};

export default SelectProjectDropDown;
