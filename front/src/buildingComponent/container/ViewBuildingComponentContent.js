import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";

import {COMPONENT_EXECUTION_STATUS_IN_PROGRESS} from "component/config";
import {RouterUtil} from "base/navigation/utilities";
import {NumberUtil} from "base/format/utilities";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";

import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {EntityContent} from "base/entity/components/presentational";
import {ViewOrUpdateBuildingComponentTechnicalDataContent} from ".";
import {ListSelector, ListSelectorItem} from "base/shared/components";
import ComponentStatusChip, {
    getStatusIcon,
} from "component/presentational/ComponentStatusChip";
import {ViewOrUpdateBuildingComponentMonitoringDataContent} from "buildingComponentMonitoring/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {DeleteItemDialog} from "base/delete/components";

import {SectionCardHeaderAction} from "base/ui/section/components";

import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewBuildingComponentContent = () => {
    const {bcMonitorings} = useOutletContext();
    const {id: projectId, buildingComponentId} = useParams();

    const navigate = useNavigateWithReload();
    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "buildingcomponents";

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [buildingComponentMonitoring, setBuildingComponentMonitoring] = useState(
        null
    );

    useEffect(() => {
        setBuildingComponentMonitoring(null);
        BuildingComponentMonitoringService.get(buildingComponentId).then(data => {
            setBuildingComponentMonitoring(data);
        });
    }, [buildingComponentId, location.state?.lastRefreshDate]);

    const handleDelete = () => {
        BuildingComponentMonitoringService.delete(buildingComponentMonitoring.id).then(
            () => {
                navigate(`/projects/list/${projectId}/buildingcomponents`, true);
            }
        );
    };

    const actions = [
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

    const componentStatusLabel =
        buildingComponentMonitoring?.execution_status ===
        COMPONENT_EXECUTION_STATUS_IN_PROGRESS
            ? `${
                  buildingComponentMonitoring?.execution_status_label
              } — ${NumberUtil.formatDecimal(
                  buildingComponentMonitoring?.physical_progress_percentage ||
                      buildingComponentMonitoring?.progress_percentage
              )}%`
            : buildingComponentMonitoring?.execution_status_label ||
              "Estado sin especificar";

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes de construcción"
            itemSelector={
                <ListSelector
                    title="Componentes"
                    items={bcMonitorings}
                    renderItem={bcComponent => (
                        <ListSelectorItem
                            key={bcComponent.id}
                            heading={bcComponent.name}
                            icon={getStatusIcon(bcComponent.execution_status)}
                            to={`/projects/list/${projectId}/buildingcomponents/${bcComponent.id}`}
                            selected={parseInt(buildingComponentId) === bcComponent.id}
                        />
                    )}
                    basePath={`/projects/list/${projectId}/buildingcomponents`}
                />
            }
            noItems={isRootPath && bcMonitorings && bcMonitorings.length === 0}
            selectorSize={3}
        >
            <ContentLayoutWithAside>
                {buildingComponentMonitoring && (
                    <EntityContent
                        entityLabel="Componente"
                        entityName={
                            buildingComponentMonitoring.building_component?.name
                        }
                        entityIcon={<HandymanOutlinedIcon />}
                        chip={
                            <ComponentStatusChip
                                label={componentStatusLabel}
                                value={buildingComponentMonitoring?.execution_status}
                            />
                        }
                        actions={actions}
                    >
                        <ViewOrUpdateBuildingComponentMonitoringDataContent
                            bcMonitoring={buildingComponentMonitoring}
                        />
                        <ViewOrUpdateBuildingComponentTechnicalDataContent
                            buildingComponent={
                                buildingComponentMonitoring?.building_component
                            }
                        />
                        <ViewOrUpdateFilesDataContent
                            folderPath={buildingComponentMonitoring.folder}
                        />
                        <ViewOrUpdateCommentsContent
                            entity={buildingComponentMonitoring}
                            service={BuildingComponentMonitoringService}
                        />
                        <EntityAuditSection entity={buildingComponentMonitoring} />
                        <DeleteItemDialog
                            isDialogOpen={isDeleteDialogOpen}
                            setIsDialogOpen={setIsDeleteDialogOpen}
                            onDelete={handleDelete}
                        />
                    </EntityContent>
                )}
            </ContentLayoutWithAside>
        </SubpageWithSelectorContainer>
    );
};

export default ViewBuildingComponentContent;
