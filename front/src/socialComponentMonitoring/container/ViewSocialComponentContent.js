import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";

import {ViewOrUpdateSocialComponentMonitoringDataContent} from ".";
import {ViewSocialComponentTrainingsContent} from "training/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ContentLayoutWithAside} from "base/ui/main";

const ViewSocialComponentContent = () => {
    const {socialComponentId} = useParams();

    const [socialComponentMonitoring, setSocialComponentMonitoring] = useState(null);
    const [trainings, setTrainings] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setSocialComponentMonitoring(null);
        SocialComponentMonitoringService.get(socialComponentId).then(data => {
            setSocialComponentMonitoring(data);
        });
        SocialComponentMonitoringService.getTrainings(socialComponentId).then(data => {
            setTrainings(data);
        });
    }, [socialComponentId, location.state?.lastRefreshDate]);

    return (
        socialComponentMonitoring && (
            <ContentLayoutWithAside>
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
            </ContentLayoutWithAside>
        )
    );
};

export default ViewSocialComponentContent;
