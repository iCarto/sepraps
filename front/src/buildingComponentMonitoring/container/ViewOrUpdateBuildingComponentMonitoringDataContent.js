import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {building_component_monitoring_view_adapter} from "buildingComponentMonitoring/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {SectionActionsMenu, SectionCardHeaderAction} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {PaymentForm} from "payment/presentational/form";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    BuildingComponentMonitoringData,
    BuildingComponentStatusChip,
} from "buildingComponentMonitoring/presentational";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

const ViewOrUpdateBuildingComponentMonitoringDataContent = ({
    projectId,
    buildingComponent,
}) => {
    const navigate = useNavigateWithReload();
    const [project] = useOutletContext();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        BuildingComponentMonitoringService.delete(buildingComponent.id).then(() => {
            navigate(`/contracts/list/${projectId}/buildingcomponent`, true);
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
                <PaymentForm
                    contractId={projectId}
                    contract={project}
                    payment={buildingComponent}
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
                <CardHeader
                    action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <HandymanOutlinedIcon
                                sx={{
                                    color: "grey",
                                }}
                            />
                            <Typography color="grey">Componente:</Typography>
                            <Typography
                                color="primary.main"
                                sx={{
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                }}
                                variant="h5"
                            >
                                {buildingComponent.building_component?.name}
                            </Typography>
                            <BuildingComponentStatusChip
                                label={
                                    buildingComponent.execution_status_label ||
                                    "Estado sin especificar"
                                }
                                value={buildingComponent.execution_status}
                            />
                        </Stack>
                    }
                    sx={{bgcolor: "grey.50", borderBottom: "1px solid #ccc"}}
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