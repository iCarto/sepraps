import {useLocation, useOutletContext} from "react-router-dom";
import {ViewDocumentsSubPage} from "base/file/components";

const ViewProjectDocumentsSubPage = () => {
    let project;
    [project] = useOutletContext();

    const location = useLocation();
    const basePath = location.pathname.split("/projects/list/")[0];

    return (
        project && (
            <ViewDocumentsSubPage
                entity={project}
                basePath={`${basePath}/projects/list`}
            />
        )
    );
};

export default ViewProjectDocumentsSubPage;
