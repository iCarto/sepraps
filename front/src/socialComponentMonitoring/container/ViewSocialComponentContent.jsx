import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {RouterUtil} from "base/navigation/utilities";
import {useNavigateWithReload} from "base/navigation/hooks";
import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";

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

import {SectionCardHeaderAction} from "base/ui/section/components";

import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewSocialComponentContent = () => {
    const {scMonitorings} = useOutletContext();
    const {socialComponentId} = useParams();

    const navigate = useNavigateWithReload();
    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "socialcomponents/list");

    const [socialComponentMonitoring, setSocialComponentMonitoring] = useState(null);
    const [trainings, setTrainings] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        SocialComponentMonitoringService.delete(socialComponentMonitoring.id).then(
            () => {
                navigate(basePath, true);
            }
        );
    };

    useEffect(() => {
        setSocialComponentMonitoring(null);
        if (socialComponentId) {
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
        } else if (scMonitorings?.length > 0) {
            navigate(scMonitorings[0].id.toString());
        }
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
                            to={`${basePath}/${scComponent.id}`}
                            selected={parseInt(socialComponentId) === scComponent.id}
                            headingFontSize={13}
                        />
                    )}
                    basePath={basePath}
                />
            }
            noItems={scMonitorings?.length === 0}
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
                                component={socialComponentMonitoring}
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
