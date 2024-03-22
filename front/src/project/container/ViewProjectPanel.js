import {useNavigate, useParams} from "react-router-dom";
import {ProjectService} from "project/service";

import {EntitySummaryPanel} from "base/entity/components/presentational";
import {ProjectSectionFields} from "project/presentational/section";
import {ClosedProjectTag} from "project/presentational";
import Stack from "@mui/material/Stack";

const ViewProjectPanel = () => {
    const {idInfoPanel} = useParams();
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
        return <ProjectSectionFields project={project} />;
    };

    const handleClickDetail = () => {
        navigate(`/projects/list/${idInfoPanel}`);
    };

    return (
        <EntitySummaryPanel
            service={ProjectService}
            id={idInfoPanel}
            title="Resumen del proyecto"
            getSectionTitle={project => project.name}
            getSectionSubheader={getCardSubheader}
            getSectionData={getSectionData}
            onClickDetailButton={handleClickDetail}
        />
    );
};

export default ViewProjectPanel;
