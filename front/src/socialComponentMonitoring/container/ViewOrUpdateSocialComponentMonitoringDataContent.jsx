import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {social_component_monitoring_view_adapter} from "socialComponentMonitoring/model";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {SocialComponentMonitoringData} from "socialComponentMonitoring/presentational";
import {SocialComponentMonitoringForm} from "socialComponentMonitoring/presentational/form";

import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateSocialComponentMonitoringDataContent = ({socialComponent}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = socialComponentMonitoring => {
        SocialComponentMonitoringService.update(
            social_component_monitoring_view_adapter({
                ...socialComponent,
                ...socialComponentMonitoring,
            })
        )
            .then(updatedSocialComponentMonitoring => {
                setMode("view");
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
            return (
                <SocialComponentMonitoringData
                    socialComponentMonitoring={socialComponent}
                />
            );
        }
        if (mode === "edit") {
            return (
                <SocialComponentMonitoringForm
                    bcMonitoring={socialComponent}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return (
        <SectionCard title="Seguimiento" secondaryActions={actions}>
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateSocialComponentMonitoringDataContent;
