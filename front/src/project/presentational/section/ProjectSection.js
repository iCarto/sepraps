import {SectionCard} from "base/ui/section/components";
import {ProjectSectionFields} from ".";
import {ClosedProjectTag} from "..";
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
            <Box mt={1}>
                <ProjectSectionFields project={project} />
            </Box>
        </SectionCard>
    );
};

export default ProjectSection;
