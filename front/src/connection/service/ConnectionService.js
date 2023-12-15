import {
    createConnection,
    createConnections,
    connection_api_adapter,
    connections_api_adapter,
} from "connection/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";
import {comment_api_adapter, createComment} from "comment/model";

const basePath = "/api/app/connections";

const entityService = createEntityService(
    basePath,
    createConnection,
    createConnections,
    connection_api_adapter,
    connections_api_adapter
);

const ConnectionService = {
    get(id) {
        return entityService.get(id).then(data => {
            return data;
        });
    },

    update(entity) {
        return entityService.update(entity);
    },

    createComment(connectionId, comment) {
        return AuthApiService.post(
            `${basePath}/${connectionId}/comments`,
            comment
        ).then(response => {
            return createComment(comment_api_adapter(response));
        });
    },
};

export default ConnectionService;
