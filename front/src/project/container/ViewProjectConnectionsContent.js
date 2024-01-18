import {useOutletContext} from "react-router-dom";
import {ConnectionService} from "connection/service";

import {ContentLayout} from "base/ui/main";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateConnectionsDataContent} from "../../connection/container";
import {ViewOrUpdateCommentsContent} from "component/container";

const ViewProjectConnectionsContent = () => {
    const {project, connection} = useOutletContext();

    return (
        <ContentLayout>
            {project && connection ? (
                <>
                    <ViewOrUpdateConnectionsDataContent
                        connection={connection}
                        project={project}
                    />
                    <ViewOrUpdateFilesDataContent folderPath={connection.folder} />
                    <ViewOrUpdateCommentsContent
                        entity={connection}
                        service={ConnectionService}
                    />
                    <EntityAuditSection entity={connection} />
                </>
            ) : null}
        </ContentLayout>
    );
};

export default ViewProjectConnectionsContent;
