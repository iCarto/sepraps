import {useEffect, useState} from "react";
import {MapStats} from "components/common/geo";
import {StatsService} from "service/api";

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
