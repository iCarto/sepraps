import {useState} from "react";
import {useParams} from "react-router-dom";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {social_component_monitoring_view_adapter} from "socialComponentMonitoring/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ComponentCardHeader} from "component/presentational";
import {SectionCardHeaderAction} from "base/ui/section/components";
import {SocialComponentMonitoringData} from "socialComponentMonitoring/presentational";
import {SocialComponentMonitoringForm} from "socialComponentMonitoring/presentational/form";
import {DeleteItemDialog} from "base/delete/components";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

const ViewOrUpdateSocialComponentMonitoringDataContent = ({socialComponent}) => {
    const navigate = useNavigateWithReload();
    const {id: projectId} = useParams();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        SocialComponentMonitoringService.delete(socialComponent.id).then(() => {
            navigate(`/projects/list/${projectId}/socialcomponent`, true);
        });
    };

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
        <SectionCardHeaderAction
            key="delete"
            name="delete"
            text="Eliminar"
            icon={<DeleteIcon color="error" />}
            onClick={() => {
                setIsDeleteDialogOpen(true);
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
        socialComponent && (
            <Card
                sx={{border: 1, borderColor: "grey.300"}}
                elevation={0}
                component="section"
            >
                <ComponentCardHeader
                    component={socialComponent}
                    componentName={socialComponent.name}
                    actions={actions}
                    icon={<HandshakeOutlinedIcon />}
                />
                <CardContent>{getComponent(mode)}</CardContent>
                <DeleteItemDialog
                    isDialogOpen={isDeleteDialogOpen}
                    setIsDialogOpen={setIsDeleteDialogOpen}
                    onDelete={handleDelete}
                />
            </Card>
        )
    );
};

export default ViewOrUpdateSocialComponentMonitoringDataContent;
