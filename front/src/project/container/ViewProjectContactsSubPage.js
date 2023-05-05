import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {ProjectService} from "project/service";

import {ProjectContactsSection} from "project/presentational/section";
import {EntityViewSubPage} from "base/entity/pages";

const ViewProjectContactsSubPage = () => {
    const {id: projectId} = useParams();
    const [contacts, setContacts] = useState([]);

    let project;
    [project] = useOutletContext();

    // TO-DO: fix handling of project contacts. Is this project-linked contacts or provider contacts instead?
    useEffect(() => {
        ProjectService.getProjectContacts(projectId).then(data => {
            console.log(data);
            setContacts(data);
        });
    }, []);

    const sections = [
        <ProjectContactsSection projectId={projectId} contacts={contacts} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectContactsSubPage;
