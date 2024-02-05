import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";

import {RouterUtil} from "base/navigation/utilities";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";

import {ViewOrUpdateBuildingComponentMonitoringDataContent} from "buildingComponentMonitoring/container";
import {
    CreateBuildingComponentDialog,
    ImportBuildingComponentsDialog,
    ViewOrUpdateBuildingComponentTechnicalDataContent,
} from "buildingComponent/container";
import ComponentStatusChip, {
    getStatusIcon,
} from "component/presentational/ComponentStatusChip";
import {ViewOrUpdateCommentsContent} from "component/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {EntityContent} from "base/entity/components/presentational";
import {ListSelector, ListSelectorItem} from "base/shared/components";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {SectionCardHeaderAction} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";

import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewBuildingComponentContent = () => {
    const {project, bcMonitorings} = useOutletContext();
    const {buildingComponentId} = useParams();

    const location = useLocation();
    const navigate = useNavigateWithReload();
    const basePath = RouterUtil.getPathForSegment(location, "buildingcomponents/list");

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCreateBComponentDialogOpen, setIsCreateBComponentDialogOpen] = useState(
        false
    );
    const [isImportBComponentsDialogOpen, setIsImportBComponentsDialogOpen] = useState(
        false
    );
    const [buildingComponentMonitoring, setBuildingComponentMonitoring] = useState(
        null
    );

    useEffect(() => {
        setBuildingComponentMonitoring(null);
        if (buildingComponentId) {
            BuildingComponentMonitoringService.get(buildingComponentId).then(data => {
                setBuildingComponentMonitoring(data);
            });
        } else if (bcMonitorings?.length > 0) {
            navigate(bcMonitorings[0].id.toString());
        }
    }, [buildingComponentId, location.state?.lastRefreshDate]);

    const handleDelete = () => {
        BuildingComponentMonitoringService.delete(buildingComponentMonitoring.id).then(
            () => {
                navigate(basePath, true);
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

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes de construcción"
            itemSelector={
                <ListSelector
                    title="Componentes"
                    items={bcMonitorings}
                    renderItem={bcComponentMonitoring => (
                        <ListSelectorItem
                            key={bcComponentMonitoring.id}
                            heading={bcComponentMonitoring.building_component.name}
                            icon={getStatusIcon(bcComponentMonitoring.execution_status)}
                            to={`${basePath}/${bcComponentMonitoring.id}`}
                            selected={
                                parseInt(buildingComponentId) ===
                                bcComponentMonitoring.id
                            }
                        />
                    )}
                    basePath={basePath}
                    onClickCreateButton={() => setIsCreateBComponentDialogOpen(true)}
                    onClickImportButton={() => setIsImportBComponentsDialogOpen(true)}
                    showAddButton={false}
                />
            }
            noItems={bcMonitorings?.length === 0}
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
                                component={buildingComponentMonitoring}
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

                <CreateBuildingComponentDialog
                    isDialogOpen={isCreateBComponentDialogOpen}
                    onCloseDialog={() => setIsCreateBComponentDialogOpen(false)}
                />
                <ImportBuildingComponentsDialog
                    isDialogOpen={isImportBComponentsDialogOpen}
                    onCloseDialog={() => setIsImportBComponentsDialogOpen(false)}
                    project={project}
                />
            </ContentLayoutWithAside>
        </SubpageWithSelectorContainer>
    );
};

export default ViewBuildingComponentContent;
