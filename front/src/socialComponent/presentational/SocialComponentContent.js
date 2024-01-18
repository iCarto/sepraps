import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";

import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ContentLayoutWithAside} from "base/ui/main";
import {ViewOrUpdateCommentsContent} from "component/container";
import {ViewOrUpdateSocialComponentMonitoringDataContent} from "socialComponentMonitoring/container";
import {
    ViewSocialComponentTrainingsContent,
    ViewSocialComponentTrainingsStats,
} from "training/container";

const SocialComponentContent = ({
    socialComponentMonitoring,
    trainingsData,
    filterForStats,
    trainings,
}) => {
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

export default SocialComponentContent;
