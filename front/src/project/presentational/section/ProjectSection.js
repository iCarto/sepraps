import {SectionCard} from "base/ui/section/components";
import {ProjectSectionFields} from ".";
import {ClosedProjectTag, ProjectTypeChip} from "..";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const ProjectSection = ({project}) => {
    return (
        <SectionCard
            title={project?.name}
            headingLabel={false}
            subheader={
                <Stack direction="row" justifyContent="space-between">
                    {project?.location}
                    {project.closed && (
                        <ClosedProjectTag
                            tagCustomStyle={{
                                m: 0,
                                ml: 2,
                            }}
                        />
                    )}
                </Stack>
            }
            dense
        >
            <Stack>
                {project?.project_works.map((project_work, index) => (
                    <ProjectTypeChip projectTypeData={project_work} index={index} />
                ))}
                <Box mt={1}>
                    <ProjectSectionFields project={project} />
                </Box>
            </Stack>
            <ProjectSectionFields project={project} />
        </SectionCard>
    );
};

export default ProjectSection;
