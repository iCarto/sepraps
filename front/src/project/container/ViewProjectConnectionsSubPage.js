import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";

import {ProjectService} from "project/service";
import {ConnectionService} from "connection/service";

import {ContentLayout} from "base/ui/main";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateConnectionsDataContent} from "../../connection/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";

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
            </ContentLayout>
        )
    );
};

export default ViewProjectConnectionsSubPage;
