import {useState} from "react";
import {useParams} from "react-router-dom";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {building_component_monitoring_view_adapter} from "buildingComponentMonitoring/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ComponentCardHeader} from "component/presentational";
import {SectionCardHeaderAction} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {BuildingComponentMonitoringData} from "buildingComponentMonitoring/presentational";
import {BuildingComponentMonitoringForm} from "buildingComponentMonitoring/presentational/form";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

const ViewOrUpdateBuildingComponentMonitoringDataContent = ({buildingComponent}) => {
    const navigate = useNavigateWithReload();
    const {id: projectId} = useParams();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        BuildingComponentMonitoringService.delete(buildingComponent.id).then(() => {
            navigate(`/projects/list/${projectId}/buildingcomponent`, true);
        });
    };

    const handleFormSubmit = buildingComponentMonitoring => {
        BuildingComponentMonitoringService.update(
            building_component_monitoring_view_adapter({...buildingComponentMonitoring})
        )
            .then(updatedBuildingComponentMonitoring => {
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
                <BuildingComponentMonitoringData
                    buildingComponentMonitoring={buildingComponent}
                />
            );
        }
        if (mode === "edit") {
            return (
                <BuildingComponentMonitoringForm
                    bcMonitoring={buildingComponent}
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
        buildingComponent && (
            <Card sx={{border: 1, borderColor: "grey.300"}} elevation={0}>
                <ComponentCardHeader
                    component={buildingComponent}
                    componentName={buildingComponent.building_component?.name}
                    actions={actions}
                    icon={<HandymanOutlinedIcon />}
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

export default ViewOrUpdateBuildingComponentMonitoringDataContent;
