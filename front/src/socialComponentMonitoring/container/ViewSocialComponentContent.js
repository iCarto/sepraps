import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {ProjectStatsService} from "project/service";
import {RouterUtil} from "base/navigation/utilities";

import {SubpageWithSelectorContainer} from "base/ui/main";
import {SocialComponentContent} from "socialComponent/presentational";
import {ComponentListSelector} from "component/presentational";

const ViewSocialComponentContent = () => {
    const {scMonitorings} = useOutletContext();
    const {id: projectId, socialComponentId} = useParams();
    const location = useLocation();

    const isRootPath = RouterUtil.getLastUrlSegment(location) === "buildingcomponents";

    const [socialComponentMonitoring, setSocialComponentMonitoring] = useState(null);
    const [trainings, setTrainings] = useState(null);
    const [trainingsData, setTrainingsData] = useState(null);

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
                trainingsData={trainingsData}
                filterForStats={filterForStats}
                trainings={trainings}
            />
        </SubpageWithSelectorContainer>
    );
};

export default ViewSocialComponentContent;
