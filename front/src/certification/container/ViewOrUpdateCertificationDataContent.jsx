import {useState} from "react";

import {useNavigateWithReload} from "base/navigation/hooks";
import {certification_view_adapter} from "certification/model";
import {CertificationService} from "certification/service";

import {CertificationData} from "certification/presentational";
import {CertificationForm} from "certification/presentational/form";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateCertificationDataContent = ({project, certification}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = certification => {
        CertificationService.update(certification_view_adapter({...certification}))
            .then(updatedCertification => {
                closeForm();
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const actions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <CertificationData certification={certification} />;
        }
        if (mode === "edit") {
            return (
                <CertificationForm
                    project={project}
                    certification={certification}
                    onSubmit={handleFormSubmit}
                    onCancel={closeForm}
                    error={error}
                />
            );
        }
    };

    const closeForm = () => {
        setMode("view");
    };

    return (
        <SectionCard title="Seguimiento" secondaryActions={actions}>
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateCertificationDataContent;
