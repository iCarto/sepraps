import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";

import {ViewOrUpdateSocialComponentMonitoringDataContent} from ".";
import {
    ViewSocialComponentTrainingsContent,
    ViewSocialComponentTrainingsStats,
} from "training/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ContentLayoutWithAside} from "base/ui/main";
import {ProjectStatsService} from "project/service";

const ViewSocialComponentContent = () => {
    const {socialComponentId} = useParams();

    const [socialComponentMonitoring, setSocialComponentMonitoring] = useState(null);
    const [trainings, setTrainings] = useState(null);
    const [trainingsData, setTrainingsData] = useState(null);
    const location = useLocation();

    const filterForStats = {
        social_component_monitoring_id: socialComponentId,
    };

    const getTotalsOnly = data => {
        let totals = {};

        Object.keys(data).forEach(property => {
            let valuesList = data[property];

            if (property === "id") {
                totals[property] = [0];
            }
            if (valuesList.length > 0 && valuesList[valuesList.length - 1] !== null) {
                totals[property] = [valuesList[valuesList.length - 1]];
            }
        });

        return totals;
    };

    useEffect(() => {
        setSocialComponentMonitoring(null);
        SocialComponentMonitoringService.get(socialComponentId).then(data => {
            setSocialComponentMonitoring(data);
        });
        SocialComponentMonitoringService.getTrainings(socialComponentId).then(data => {
            setTrainings(data);
        });
        ProjectStatsService.getSocialComponentTrainingsTotalStats(filterForStats).then(
            data => {
                const parsedData = getTotalsOnly(data);
                setTrainingsData(parsedData);
            }
        );
    }, [socialComponentId, location.state?.lastRefreshDate]);

    return (
        socialComponentMonitoring && (
            <ContentLayoutWithAside>
                <ViewOrUpdateSocialComponentMonitoringDataContent
                    socialComponent={socialComponentMonitoring}
                />
                <ViewSocialComponentTrainingsStats
                    trainingData={trainingsData}
                    filter={filterForStats}
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
