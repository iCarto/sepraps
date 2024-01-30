import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {RouterUtil} from "base/navigation/utilities";

import {SubpageWithSelectorContainer} from "base/ui/main";
import {SocialComponentContent} from "socialComponent/presentational";
import {ComponentListSelector} from "component/presentational";

const ViewSocialComponentContent = () => {
    const {scMonitorings} = useOutletContext();
    const {id: projectId, socialComponentId} = useParams();
    const location = useLocation();

    const isRootPath = RouterUtil.getLastUrlSegment(location) === "socialcomponents";

    const [socialComponentMonitoring, setSocialComponentMonitoring] = useState(null);
    const [trainings, setTrainings] = useState(null);

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

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes sociales"
            itemSelector={
                <ComponentListSelector
                    components={scMonitorings}
                    basePath={`/projects/list/${projectId}/socialcomponents`}
                    selectedComponentId={parseInt(socialComponentId)}
                    reduceItemsFontSize
                />
            }
            noItems={isRootPath && scMonitorings && scMonitorings.length === 0}
        >
            <SocialComponentContent
                socialComponentMonitoring={socialComponentMonitoring}
                trainings={trainings}
            />
        </SubpageWithSelectorContainer>
    );
};

export default ViewSocialComponentContent;
