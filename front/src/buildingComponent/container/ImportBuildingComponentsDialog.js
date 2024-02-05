import {useEffect, useState} from "react";

import {theme} from "Theme";
import {ProjectService} from "project/service";
import {building_component_view_adapter} from "buildingComponent/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {BuildingComponentListItemButton} from "buildingComponent/presentational";
import {ProjectSearchAutocomplete} from "project/presentational/form";
import {SelectAllTransferList} from "base/list/components";
import {DialogLayout} from "base/dialog/components";
import {AlertError} from "base/error/components";

import Typography from "@mui/material/Typography";

const firstTimeMessage = (
    <Typography variant="body2" component="span">
        Seleccione un proyecto para mostrar sus componentes de obra.
    </Typography>
);
const noItemsFoundMessage = (
    <Typography variant="body2" component="span">
        El proyecto seleccionado no tiene componentes de obra. <br />
        Por favor, seleccione otro proyecto.
    </Typography>
);

const ImportBuildingComponentsDialog = ({isDialogOpen, onCloseDialog, project}) => {
    const [existingProjectId, setExistingProjectId] = useState(null);
    const [selectedBCMonitorings, setSelectedBCMonitorings] = useState([]);
    const [availableBCMonitorings, setAvailableBCMonitorings] = useState([]);
    const [noItemsMessage, setNoItemsMessage] = useState(firstTimeMessage);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    useEffect(() => {
        setExistingProjectId(null);
    }, [isDialogOpen]);

    useEffect(() => {
        if (!existingProjectId) {
            setSelectedBCMonitorings([]);
            setAvailableBCMonitorings([]);
        } else {
            setIsLoading(true);
            ProjectService.getProjectBuildingComponentMonitorings(existingProjectId)
                .then(data => {
                    setAvailableBCMonitorings(data);
                    setIsLoading(false);
                    if (data && !data.length) setNoItemsMessage(noItemsFoundMessage);
                })
                .catch(error => {
                    console.log(error);
                    setError(error);
                });
        }
    }, [existingProjectId, isDialogOpen]);

    const handleSelectExistingProject = project => {
        if (project) setExistingProjectId(project.id);
        else setExistingProjectId(null);
    };

    const handleSelectedItems = selectedItems => {
        setSelectedBCMonitorings(selectedItems);
    };

    const handleAvailableItems = selectedItems => {
        setAvailableBCMonitorings(selectedItems);
    };

    const handleConfirmAddition = () => {
        const selectedBuildingComponents = building_component_view_adapter(
            selectedBCMonitorings
        );
        handleFormSubmit(selectedBuildingComponents);
    };

    const handleFormSubmit = selectedBuildingComponents => {
        const createBCMonitoringPromises = selectedBuildingComponents.map(bc =>
            ProjectService.createProjectBuildingComponentMonitoring(project.id, bc)
        );

        Promise.all(createBCMonitoringPromises)
            .then(createdBCMonitorings => {
                const lastCreatedBCMonitoringId =
                    createdBCMonitorings[createdBCMonitorings.length - 1].id;
                navigate(
                    `/projects/list/${project.id}/buildingcomponents/list/${lastCreatedBCMonitoringId}`,
                    true
                );
                onCloseDialog();
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <DialogLayout
            dialogTitle={`Añadir componentes de obra ya existentes`}
            dialogHeading={
                <>
                    <AlertError error={error} />
                    <ProjectSearchAutocomplete
                        handleSelect={handleSelectExistingProject}
                    />
                </>
            }
            dialogContent={
                <SelectAllTransferList
                    availableItems={availableBCMonitorings}
                    preSelectedItems={selectedBCMonitorings}
                    noItemsMessage={noItemsMessage}
                    isListLoading={isLoading}
                    onChangeLeftItems={handleAvailableItems}
                    onChangeRightItems={handleSelectedItems}
                    listItemComponent={BuildingComponentListItemButton}
                />
            }
            mainActionText="Guardar"
            onMainActionClick={handleConfirmAddition}
            onHandleDialog={onCloseDialog}
            isDialogOpen={isDialogOpen}
            style={{backgroundColor: theme.palette.pageBackground.secondary}}
            fullWidth
            maxWidth="md"
        />
    );
};

export default ImportBuildingComponentsDialog;
