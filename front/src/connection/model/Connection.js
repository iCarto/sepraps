import {comments_api_adapter, createComments} from "comment/model";

class Connections extends Array {}

const connection_api_adapter = connection => {
    if (connection["comments"]) {
        connection["comments"] = createComments(
            comments_api_adapter(connection["comments"])
        );
    }

    return connection;
};

const connection_view_adapter = connection => {
    delete connection["folder"];
    delete connection["created_by"];
    delete connection["created_at"];
    delete connection["updated_at"];
    delete connection["updated_by"];

    delete connection["population"];
    delete connection["connected_households_percentage"];
    delete connection["coverage"];
    delete connection["connection_comments"];

    return connection;
};

const connections_api_adapter = connections => {
    return connections.map(connection_api_adapter);
};

const createConnections = (data = []) => {
    const connections = Connections.from(data, connection =>
        createConnection(connection)
    );
    return connections;
};

const createConnection = ({
    id = null,
    number_of_households = null,
    population = null,
    number_of_existing_connections = null,
    number_of_planned_connections = null,
    number_of_actual_connections = null,
    connected_households_percentage = null,
    coverage = null,
    comments = [],
    project = null,
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        number_of_households,
        population,
        number_of_existing_connections,
        number_of_planned_connections,
        number_of_actual_connections,
        connected_households_percentage,
        coverage,
        project,
        comments,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createConnection as default,
    createConnections,
    connection_api_adapter,
    connections_api_adapter,
    connection_view_adapter,
};
