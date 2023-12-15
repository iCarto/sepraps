import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";

import {ProjectService} from "project/service";
import {ConnectionService} from "connection/service";

import {ContentLayout} from "base/ui/main";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateConnectionsDataContent} from "../../connection/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";

import Stack from "@mui/system/Stack";

const ViewProjectConnectionsSubPage = () => {
    const {id: projectId} = useParams();

    const [connection, setConnection] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setConnection(null);
        ProjectService.getProjectConnections(projectId).then(data => {
            setConnection(data[0]);
        });
    }, [projectId, location.state?.lastRefreshDate]);

    return (
        connection && (
            <ContentLayout>
                <Stack spacing={1}>
                    <ViewOrUpdateConnectionsDataContent
                        connection={connection}
                        projectId={projectId}
                    />
                    <ViewOrUpdateFilesDataContent folderPath={connection.folder} />
                    <ViewOrUpdateCommentsContent
                        entity={connection}
                        service={ConnectionService}
                    />
                    <EntityAuditSection entity={connection} />
                </Stack>
            </ContentLayout>
        )
    );
};

export default ViewProjectConnectionsSubPage;
