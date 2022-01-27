class Documents extends Array {}

const document_api_adapter = document => {
    document["name"] = document.media_name;
    document["content_type"] = document.media_content_type;
    document["path"] = document.media_path;
    return document;
};

const documents_api_adapter = documents => documents.map(document_api_adapter);

const createDocuments = (data = []) => {
    const documents = Documents.from(data, document => createDocument(document));
    return documents;
};

const createDocument = ({
    id = null,
    name = "",
    content_type = "",
    size = null,
    path = "",
    url = "",
} = {}) => {
    const publicApi = {
        id,
        name,
        content_type,
        path,
        size,
        url,
    };

    return Object.freeze(publicApi);
};

export {
    createDocument as default,
    createDocuments,
    document_api_adapter,
    documents_api_adapter,
};
