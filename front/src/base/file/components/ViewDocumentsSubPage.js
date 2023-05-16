import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FolderViewProvider} from "base/file/provider";
import {PageLayout} from "base/ui/main";
import {SectionCard} from "base/section/components";
import {ListFolder} from "base/file/components";

const ViewDocumentsSubPage = ({entity, basePath}) => {
    const [folderPath, setFolderPath] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);

    const params = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const baseDocumentsPath = `${basePath}/${entity.id}/documents/`;
    console.log({baseDocumentsPath});

    useEffect(() => {
        let path = params["*"];
        if (!path) {
            path = entity.folder;
        }
        if (pathname.startsWith(baseDocumentsPath + "detail")) {
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
    }, [params, entity]);

    const handleSelectElement = folderElement => {
        setSelectedElement(folderElement);
        if (folderElement.content_type) {
            navigate(baseDocumentsPath + "detail/" + folderElement.path);
        } else {
            navigate(baseDocumentsPath + folderPath);
        }
    };

    return (
        <PageLayout>
            {folderPath ? (
                <SectionCard title="Documentos">
                    <FolderViewProvider>
                        <ListFolder
                            folderPath={folderPath}
                            basePath={baseDocumentsPath}
                            selectedElement={selectedElement}
                            onSelectElement={handleSelectElement}
                        />
                    </FolderViewProvider>
                </SectionCard>
            ) : null}
        </PageLayout>
    );
};

export default ViewDocumentsSubPage;
