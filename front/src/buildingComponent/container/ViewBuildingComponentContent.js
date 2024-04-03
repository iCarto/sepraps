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
    ViewOrUpdateBuildingComponentDataContent,
} from "buildingComponent/container";
import {BuildingComponentNameForm} from "buildingComponent/presentational/form";
import ComponentStatusChip, {
    getStatusIcon,
} from "component/presentational/ComponentStatusChip";
import {DomainProvider} from "sepraps/domain/provider";
import {ViewOrUpdateCommentsContent} from "component/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {EntityContent} from "base/entity/components/presentational";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ListSelector, ListSelectorItem, Spinner} from "base/shared/components";
import {SectionCardHeaderAction} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {AlertError} from "base/error/components";

import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewBuildingComponentContent = () => {
    const {project, bcMonitorings} = useOutletContext();
    const {buildingComponentId} = useParams();

    const location = useLocation();
    const navigate = useNavigateWithReload();
    const basePath = RouterUtil.getPathForSegment(location, "buildingcomponents/list");

    const [bCMonitoring, setBCMonitoring] = useState(null);
    const [headerMode, setHeaderMode] = useState("view");
    const [openDialog, setOpenDialog] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBCMonitoring(null);
        if (buildingComponentId) {
            setIsLoading(true);
            BuildingComponentMonitoringService.get(buildingComponentId)
                .then(data => {
                    setBCMonitoring(data);
                    setError(null);
                    setIsLoading(false);
                })
                .catch(error => {
                    handleError(error);
                    setIsLoading(false);
                });
        } else if (bcMonitorings?.length > 0) {
            navigate(bcMonitorings[0].id.toString());
        }
    }, [buildingComponentId, location.state?.lastRefreshDate]);

    const handleDelete = () => {
        BuildingComponentMonitoringService.delete(bCMonitoring.id)
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                handleError(error);
            });
    };

    const handleError = error => {
        console.log(error);
        setError(error);
    };

    const actions = [
        <SectionCardHeaderAction
            key="edit-name"
            name="edit-name"
            text="Modificar nombre"
            icon={<DriveFileRenameOutlineIcon />}
            onClick={() => {
                setHeaderMode("edit-name");
            }}
        />,
        <SectionCardHeaderAction
            key="delete"
            name="delete"
            text="Eliminar"
            icon={<DeleteIcon color="error" />}
            onClick={() => {
                setOpenDialog("delete");
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
                    basePath={basePath}
                    onClickMenuButton={setOpenDialog}
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
                />
            }
            noItems={bcMonitorings?.length === 0}
            selectorSize={3}
        >
            <ContentLayoutWithAside>
                <AlertError error={error} />
                {isLoading ? <Spinner /> : null}
                {bCMonitoring && (
                    <EntityContent
                        entityLabel="Componente"
                        entityName={bCMonitoring.building_component?.name}
                        entityIcon={<HandymanOutlinedIcon />}
                        chip={<ComponentStatusChip component={bCMonitoring} />}
                        actions={actions}
                        headerMode={headerMode}
                        EditForm={
                            <BuildingComponentNameForm
                                buildingComponent={bCMonitoring?.building_component}
                                onCloseForm={() => {
                                    setHeaderMode("view");
                                }}
                            />
                        }
                    >
                        <ViewOrUpdateBuildingComponentMonitoringDataContent
                            bcMonitoring={bCMonitoring}
                        />
                        <DomainProvider>
                            <ViewOrUpdateBuildingComponentDataContent
                                buildingComponent={bCMonitoring?.building_component}
                                sectionName="Datos técnicos"
                                propertiesKey="technical_properties"
                            />
                            <ViewOrUpdateBuildingComponentDataContent
                                buildingComponent={bCMonitoring?.building_component}
                                sectionName="Datos de validación"
                                propertiesKey="validation_properties"
                            />
                        </DomainProvider>
                        <ViewOrUpdateFilesDataContent
                            folderPath={bCMonitoring.folder}
                        />
                        <ViewOrUpdateCommentsContent
                            entity={bCMonitoring}
                            service={BuildingComponentMonitoringService}
                        />
                        <EntityAuditSection entity={bCMonitoring} />

                        <DeleteItemDialog
                            isDialogOpen={openDialog === "delete"}
                            setIsDialogOpen={setOpenDialog}
                            onDelete={handleDelete}
                        />
                    </EntityContent>
                )}

                <CreateBuildingComponentDialog
                    isDialogOpen={openDialog === "create"}
                    onCloseDialog={() => setOpenDialog(null)}
                />
                <ImportBuildingComponentsDialog
                    isDialogOpen={openDialog === "import"}
                    onCloseDialog={() => setOpenDialog(null)}
                    project={project}
                />
            </ContentLayoutWithAside>
        </SubpageWithSelectorContainer>
    );
};

export default ViewBuildingComponentContent;
