import {SectionCard} from "base/ui/section/components";
import {ProjectSectionFields} from ".";
import {ClosedProjectTag, ProjectTypeClassChip} from "..";
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
            <Stack direction="row" sx={{flexWrap: "wrap", gap: 0.5}}>
                {project?.project_works.map((project_work, index) => (
                    <ProjectTypeClassChip key={index} projectWorkData={project_work} />
                ))}
            </Stack>
            <Box mt={1}>
                <ProjectSectionFields project={project} />
            </Box>
        </SectionCard>
    );
};

export default ProjectSection;
