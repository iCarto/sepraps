import {useEffect, useState} from "react";
import {useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";

import {SubPageLayout} from "base/ui/main";
import {SectionCard} from "base/section/components";

import {FolderViewProvider} from "base/file/provider";
import {ListFolder} from "base/file/components";
import Grid from "@mui/material/Grid";

const ViewProjectDocumentsSubPage = () => {
    const [folderPath, setFolderPath] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const params = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const basePath = `/projects/${project.id}/documents/`;

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    useEffect(() => {
        let path = params["*"];
        if (!path) {
            path = project.folder;
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

    return (
        <SubPageLayout
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {folderPath && (
                        <SectionCard title="Documentos">
                            <FolderViewProvider>
                                <ListFolder
                                    folderPath={folderPath}
                                    basePath={basePath}
                                    selectedElement={selectedElement}
                                    onSelectElement={handleSelectElement}
                                />
                            </FolderViewProvider>
                        </SectionCard>
                    )}
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectDocumentsSubPage;
