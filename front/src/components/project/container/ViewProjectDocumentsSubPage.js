import {useEffect, useState} from "react";
import {useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";

import {SubPageLayout} from "layout";
import {SectionCard} from "components/common/presentational";
import {ListFolder} from "components/document/container";
import {FolderViewProvider} from "components/document/provider";
import Grid from "@mui/material/Grid";

const ViewProjectDocumentsSubPage = () => {
    let project;
    [project] = useOutletContext();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    console.log({pathname});

    const basePath = `/projects/${project.id}/documents/`;

    const [folderPath, setFolderPath] = useState(null);

    const [selectedElement, setSelectedElement] = useState(null);

    const params = useParams();

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
    }, [params]);

    const handleSelectElement = folderElement => {
        setSelectedElement(folderElement);
        if (folderElement.content_type) {
            navigate(basePath + "detail/" + folderElement.path);
        } else {
            navigate(basePath + folderPath);
        }
    };

    return (
        <SubPageLayout>
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
