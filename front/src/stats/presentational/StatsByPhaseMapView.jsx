import {useEffect, useState} from "react";
import {StatsService} from "stats/service";
import ProjectsMapStats from "./ProjectsMapStats";

const StatsByPhaseMapView = ({filter}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        StatsService.getMapsByPhase(filter).then(projects => {
            setProjects(projects);
        });
    }, [filter]);

    return <ProjectsMapStats projects={projects} />;
};

export default StatsByPhaseMapView;
