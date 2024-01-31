import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {RouterUtil} from "base/navigation/utilities";

import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {ListSelector, ListSelectorItem} from "base/shared/components";
import ComponentStatusChip, {
    getStatusIcon,
} from "component/presentational/ComponentStatusChip";
import {ViewOrUpdateSocialComponentMonitoringDataContent} from ".";
import {ViewSocialComponentTrainingsContent} from "training/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {DeleteItemDialog} from "base/delete/components";
import {EntityContent} from "base/entity/components/presentational";

import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import {NumberUtil} from "base/format/utilities";
import {COMPONENT_EXECUTION_STATUS_IN_PROGRESS} from "component/config";
import {useNavigateWithReload} from "base/navigation/hooks";
import {SectionCardHeaderAction} from "base/ui/section/components";

import DeleteIcon from "@mui/icons-material/Delete";

const ViewSocialComponentContent = () => {
    const {scMonitorings} = useOutletContext();
    const {id: projectId, socialComponentId} = useParams();

    const navigate = useNavigateWithReload();
    const location = useLocation();

    const isRootPath = RouterUtil.getLastUrlSegment(location) === "socialcomponents";

    const [socialComponentMonitoring, setSocialComponentMonitoring] = useState(null);
    const [trainings, setTrainings] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        SocialComponentMonitoringService.delete(socialComponentMonitoring.id).then(
            () => {
                navigate(`/projects/list/${projectId}/socialcomponents`, true);
            }
        );
    };

    useEffect(() => {
        setSocialComponentMonitoring(null);
        SocialComponentMonitoringService.get(socialComponentId)
            .then(data => {
                setSocialComponentMonitoring(data);
            })
            .catch(error => {
                console.log(error);
            });
        SocialComponentMonitoringService.getTrainings(socialComponentId)
            .then(data => {
                setTrainings(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [socialComponentId, location.state?.lastRefreshDate]);

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
        socialComponentMonitoring?.execution_status ===
        COMPONENT_EXECUTION_STATUS_IN_PROGRESS
            ? `${
                  socialComponentMonitoring?.execution_status_label
              } — ${NumberUtil.formatDecimal(
                  socialComponentMonitoring?.physical_progress_percentage ||
                      socialComponentMonitoring?.progress_percentage
              )}%`
            : socialComponentMonitoring?.execution_status_label ||
              "Estado sin especificar";

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes sociales"
            itemSelector={
                <ListSelector
                    title="Componentes"
                    items={scMonitorings}
                    renderItem={scComponent => (
                        <ListSelectorItem
                            key={scComponent.id}
                            heading={scComponent.name}
                            icon={getStatusIcon(scComponent.execution_status)}
                            to={`/projects/list/${projectId}/socialcomponents/${scComponent.id}`}
                            selected={parseInt(socialComponentId) === scComponent.id}
                            headingFontSize={13}
                        />
                    )}
                    basePath={`/projects/list/${projectId}/socialcomponents`}
                />
            }
            noItems={isRootPath && scMonitorings && scMonitorings.length === 0}
            selectorSize={3}
        >
            <ContentLayoutWithAside>
                {socialComponentMonitoring && (
                    <EntityContent
                        entityLabel="Componente"
                        entityName={socialComponentMonitoring.name}
                        entityIcon={<HandshakeOutlinedIcon />}
                        chip={
                            <ComponentStatusChip
                                label={componentStatusLabel}
                                value={socialComponentMonitoring?.execution_status}
                            />
                        }
                        actions={actions}
                    >
                        <ViewOrUpdateSocialComponentMonitoringDataContent
                            socialComponent={socialComponentMonitoring}
                        />
                        <ViewSocialComponentTrainingsContent
                            socialComponent={socialComponentMonitoring}
                            trainings={trainings}
                        />
                        <ViewOrUpdateFilesDataContent
                            folderPath={socialComponentMonitoring.folder}
                        />
                        <ViewOrUpdateCommentsContent
                            entity={socialComponentMonitoring}
                            service={SocialComponentMonitoringService}
                        />
                        <EntityAuditSection entity={socialComponentMonitoring} />
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

export default ViewSocialComponentContent;
