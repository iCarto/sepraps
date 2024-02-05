import {useState} from "react";
import {useLocation, useParams} from "react-router";

import {ProjectService} from "project/service";
import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {building_component_monitoring_view_adapter} from "buildingComponentMonitoring/model";
import {building_component_view_adapter} from "buildingComponent/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {BuildingComponentForm} from "buildingComponent/presentational/form";
import {SectionCard} from "base/ui/section/components";

// TO-DO: Remove unused component
const CreateBuildingComponentContent = () => {
    const navigate = useNavigateWithReload();
    const location = useLocation();
    const {id: projectId} = useParams();

    const [error, setError] = useState(null);

    const handleFormSubmit = data => {
        ProjectService.createProjectBuildingComponentMonitoring(
            projectId,
            building_component_view_adapter({...data})
        )
            .then(createdBuildingComponent => {
                return BuildingComponentMonitoringService.update(
                    building_component_monitoring_view_adapter({
                        ...createdBuildingComponent,
                        ...data,
                    })
                );
            })
            .then(updatedBuildingComponentMonitoring => {
                navigate(
                    location.pathname.replace(
                        "/new",
                        `/${updatedBuildingComponentMonitoring.id}`
                    ),
                    true
                );
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <SectionCard title="Nuevo componente de construcción">
            <BuildingComponentForm
                projectId={projectId}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    navigate(-1);
                }}
                error={error}
            />
        </SectionCard>
    );
};

export default CreateBuildingComponentContent;
