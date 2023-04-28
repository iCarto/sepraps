import {useEffect, useState} from "react";
import {MapStats} from "base/map/components";
import {StatsService} from "stats/service";

const StatsByPhaseMapView = ({filter}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        StatsService.getMapsByPhase(filter).then(projects => {
            setProjects(projects);
        });
    }, [filter]);

    return <MapStats projects={projects} />;
};

export default StatsByPhaseMapView;
