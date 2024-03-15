import {useNavigate, useParams} from "react-router-dom";
import {ProjectService} from "project/service";

import {EntitySummaryPanel} from "base/entity/components/presentational";
import {ProjectSectionFields} from "project/presentational/section";
import {ClosedProjectTag, ProjectTypeChip} from "project/presentational";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const ViewProjectPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const getSectionData = project => {
        return (
            <Stack mt={project.featured_image ? -2 : 0}>
                {project?.project_works.map((project_work, index) => (
                    <ProjectTypeChip projectTypeData={project_work} index={index} />
                ))}
                <Box mt={1}>
                    <ProjectSectionFields project={project} />
                </Box>
            </Stack>
        );
    };

    const getCardSubheader = project => {
        return (
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
        );
    };

    const handleClickDetail = () => {
        navigate(`/projects/list/${id}`);
    };

    return (
        <EntitySummaryPanel
            service={ProjectService}
            id={id}
            title="Resumen del proyecto"
            getSectionTitle={project => project.name}
            getSectionSubheader={getCardSubheader}
            getSectionData={getSectionData}
            onClickDetailButton={handleClickDetail}
        />
    );
};

export default ViewProjectPanel;
