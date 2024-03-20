import {useNavigate, useParams} from "react-router-dom";
import {ProjectService} from "project/service";

import {EntitySummaryPanel} from "base/entity/components/presentational";
import {ProjectSectionFields} from "project/presentational/section";
import {ClosedProjectTag, ProjectTypeClassChip} from "project/presentational";
import Stack from "@mui/material/Stack";

const ViewProjectPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

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

    const getSectionData = project => {
        return (
            <>
                <Stack
                    direction="row"
                    mt={project.featured_image ? -2 : 0}
                    sx={{flexWrap: "wrap", gap: 0.5}}
                >
                    {project?.project_works.map((project_work, index) => (
                        <ProjectTypeClassChip
                            key={index}
                            projectWorkData={project_work}
                        />
                    ))}
                </Stack>
                <ProjectSectionFields project={project} />
            </>
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
