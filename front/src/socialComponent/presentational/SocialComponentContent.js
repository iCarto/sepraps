import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";

import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ContentLayoutWithAside} from "base/ui/main";
import {ViewOrUpdateCommentsContent} from "component/container";
import {ViewOrUpdateSocialComponentMonitoringDataContent} from "socialComponentMonitoring/container";
import {ViewSocialComponentTrainingsContent} from "training/container";

const SocialComponentContent = ({socialComponentMonitoring, trainings}) => {
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

export default SocialComponentContent;
