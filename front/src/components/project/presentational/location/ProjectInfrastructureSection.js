import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {Map} from "components/common/geo";
import EditIcon from "@mui/icons-material/Edit";

const ProjectInfrastructureSection = ({isSidePanelOpen = null}) => {
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const headerActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("main_infrastructure/edit");
            }}
        />,
    ];

    return (
        <SectionCard
            title="Infraestructura principal"
            secondaryActions={headerActions}
            isSidePanelOpen={isSidePanelOpen}
        >
            <SectionField
                label="Ubicación:"
                value={`${project.main_infrastructure.latitude}, ${project.main_infrastructure.longitude}`}
            />
            <SectionField
                label="Altitud:"
                value={
                    project.main_infrastructure.altitude
                        ? `${project.main_infrastructure.altitude} metros`
                        : ""
                }
            />
            <Map
                markerPosition={{
                    lat: project.main_infrastructure.latitude,
                    lng: project.main_infrastructure.longitude,
                }}
                text={`${project.name}, ${project.location}`}
            />
        </SectionCard>
    );
};

export default ProjectInfrastructureSection;
