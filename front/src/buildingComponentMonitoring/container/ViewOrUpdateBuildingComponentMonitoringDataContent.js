import {useState} from "react";
import {useParams} from "react-router-dom";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {BuildingComponentService} from "buildingComponent/service";
import {building_component_view_adapter} from "buildingComponent/model";
import {building_component_monitoring_view_adapter} from "buildingComponentMonitoring/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ComponentCardHeader} from "component/presentational";
import {SectionCardHeaderAction} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {BuildingComponentMonitoringData} from "buildingComponentMonitoring/presentational";
import {BuildingComponentMonitoringForm} from "buildingComponentMonitoring/presentational/form";
import {BuildingComponentNameForm} from "buildingComponent/presentational/form";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";

const ViewOrUpdateBuildingComponentMonitoringDataContent = ({bcMonitoring}) => {
    const navigate = useNavigateWithReload();
    const {id: projectId} = useParams();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        BuildingComponentMonitoringService.delete(bcMonitoring.id).then(() => {
            navigate(`/projects/list/${projectId}/buildingcomponent`, true);
        });
    };

    const handleBcMonitoringFormSubmit = updatedBcMonitoring => {
        updateEntity(
            {...updatedBcMonitoring},
            BuildingComponentMonitoringService,
            building_component_monitoring_view_adapter
        );
    };

    const handleBuildingComponentFormSubmit = updatedBuildingComponent => {
        updateEntity(
            {...bcMonitoring.building_component, ...updatedBuildingComponent},
            BuildingComponentService,
            building_component_view_adapter
        );
    };

    const updateEntity = (formData, updateService, dataAdapter) => {
        updateService
            .update(dataAdapter(formData))
            .then(updatedData => {
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
            text="Editar seguimiento"
            icon={<DonutLargeOutlinedIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
        <SectionCardHeaderAction
            key="edit-name"
            name="edit-name"
            text="Editar nombre"
            icon={<DriveFileRenameOutlineIcon />}
            onClick={() => {
                setMode("edit-name");
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
            return <BuildingComponentMonitoringData bcMonitoring={bcMonitoring} />;
        }
        if (mode === "edit") {
            return (
                <BuildingComponentMonitoringForm
                    bcMonitoring={bcMonitoring}
                    onSubmit={handleBcMonitoringFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
        if (mode === "edit-name") {
            return (
                <BuildingComponentNameForm
                    buildingComponent={bcMonitoring.building_component}
                    onSubmit={handleBuildingComponentFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return (
        bcMonitoring && (
            <Card
                sx={{border: 1, borderColor: "grey.300"}}
                elevation={0}
                component="section"
            >
                <ComponentCardHeader
                    component={bcMonitoring}
                    componentName={bcMonitoring.building_component?.name}
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
