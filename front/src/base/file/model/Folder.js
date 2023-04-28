import createDocument, {document_api_adapter} from "./Document";

class Folders extends Array {}

const folder_api_adapter = folder => {
    folder["name"] = folder.media_name;
    folder["path"] = folder.media_path;
    if (folder.children) {
        folder["children"] = folder.children.map(child => {
            if (child.media_type === "FOLDER") {
                return createFolder(folder_api_adapter(child));
            }
            return createDocument(document_api_adapter(child));
        });
    }
    return folder;
};

const folders_api_adapter = folders => folders.map(folder_api_adapter);

const createFolders = (data = []) => {
    const folders = Folders.from(data, folder => createFolder(folder));
    return folders;
};

const createFolder = ({
    id = null,
    name = "",
    path = "",
    url = "",
    children = [],
} = {}) => {
    const publicApi = {
        id,
        name,
        path,
        url,
        children,
    };

    return Object.freeze(publicApi);
};

export {
    createFolder as default,
    createFolders,
    folder_api_adapter,
    folders_api_adapter,
};
