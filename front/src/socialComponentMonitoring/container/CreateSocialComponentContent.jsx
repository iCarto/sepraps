import {useState} from "react";
import {useLocation, useParams} from "react-router";

import {ProjectService} from "project/service";
import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {social_component_monitoring_view_adapter} from "socialComponentMonitoring/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {SectionCard} from "base/ui/section/components";
import {SocialComponentForm} from "socialComponentMonitoring/presentational/form";

const CreateSocialComponentContent = () => {
    const navigate = useNavigateWithReload();
    const location = useLocation();
    const {id: projectId} = useParams();

    const [error, setError] = useState(null);

    const handleFormSubmit = data => {
        return ProjectService.createProjectSocialComponent(
            projectId,
            social_component_monitoring_view_adapter({...data})
        )
            .then(createdSocialComponent => {
                return SocialComponentMonitoringService.update(
                    social_component_monitoring_view_adapter({
                        ...createdSocialComponent,
                        ...data,
                    })
                );
            })
            .then(updatedSocialComponentMonitoring => {
                navigate(
                    location.pathname.replace(
                        "/new",
                        `/${updatedSocialComponentMonitoring.id}`
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
        <SectionCard title="Nuevo componente social">
            <SocialComponentForm
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

export default CreateSocialComponentContent;
