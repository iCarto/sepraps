import {useState} from "react";
import {useLocation, useParams} from "react-router";
import {CertificationService} from "certification/service";
import {CertificationForm} from "certification/presentational/form";
import {certification_view_adapter} from "certification/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {SectionCard} from "base/ui/section/components";
import {useOutletContext} from "react-router-dom";

const CreateCertificationContent = () => {
    const navigate = useNavigateWithReload();
    const location = useLocation();
    const {id: projectId} = useParams();

    const {project} = useOutletContext();

    const [error, setError] = useState(null);

    const handleFormSubmit = certification => {
        CertificationService.create(certification_view_adapter({...certification}))
            .then(createdCertification => {
                navigate(
                    location.pathname.replace("/new", `/${createdCertification.id}`),
                    true
                );
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <SectionCard title="Nueva certificación">
            <CertificationForm
                project={project}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    navigate(-1);
                }}
                error={error}
            />
        </SectionCard>
    );
};

export default CreateCertificationContent;
