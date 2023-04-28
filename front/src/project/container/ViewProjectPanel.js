import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProjectService} from "project/service";

import {EntityViewPanel} from "base/entity/components";
import {ProjectCard} from "../presentational";

const ViewProjectPanel = () => {
    const navigate = useNavigateWithReload();
    const [project, setProject] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        ProjectService.get(id).then(project => {
            setProject(project);
        });
    }, [id]);

    const handleClickDetail = () => {
        navigate(`/projects/${project.id}/summary`);
    };

    return (
        project && (
            <EntityViewPanel
                onClickDetailButton={handleClickDetail}
                title="Resumen del proyecto"
            >
                {<ProjectCard project={project} />}
            </EntityViewPanel>
        )
    );
};

export default ViewProjectPanel;
