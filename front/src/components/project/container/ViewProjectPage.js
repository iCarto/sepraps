import {useState, useEffect, Fragment} from "react";
import {Outlet, useParams} from "react-router-dom";

import {ProjectService} from "service/api";

import {ProjectMenu} from "../presentational";

const ViewProjectPage = () => {
    const {id} = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        ProjectService.getProject(id).then(data => {
            setProject(data);
        });
    }, [id, project]);

    return (
        project && (
            <Fragment>
                <ProjectMenu />
                <Outlet context={[project]} />
            </Fragment>
        )
    );
};

export default ViewProjectPage;
