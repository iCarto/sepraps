import {MapStats} from "base/geo";
import {useEffect, useState} from "react";
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
