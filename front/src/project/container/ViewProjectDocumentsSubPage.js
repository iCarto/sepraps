import {useEffect, useState} from "react";
import {useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";

import {FolderViewProvider} from "base/file/provider";

import {ListFolder} from "base/file/components";
import {SectionCard} from "base/section/components";
import {EntityViewSubPage} from "base/entity/pages";

const ViewProjectDocumentsSubPage = () => {
    const [folderPath, setFolderPath] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const params = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const basePath = `/projects/${project?.id}/documents/`;

    useEffect(() => {
        let path = params["*"];
        if (!path) {
            path = project?.folder;
        }
        if (pathname.startsWith(basePath + "detail")) {
            // If we are in detail view
            setFolderPath(
                path
                    .split("/")
                    .slice(0, -1)
                    .join("/")
            );
        } else {
            setFolderPath(path);
        }
    }, [params, project]);

    const handleSelectElement = folderElement => {
        setSelectedElement(folderElement);
        if (folderElement.content_type) {
            navigate(basePath + "detail/" + folderElement.path);
        } else {
            navigate(basePath + folderPath);
        }
    };

    const sections = [
        <SectionCard title="Documentos">
            <FolderViewProvider>
                <ListFolder
                    folderPath={folderPath}
                    basePath={basePath}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectElement}
                />
            </FolderViewProvider>
        </SectionCard>,
    ];

    return folderPath && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectDocumentsSubPage;
