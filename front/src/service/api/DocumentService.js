import {folder_api_adapter, createFolder} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/documents/";

const DocumentService = {
    getFolder(path) {
        return AuthApiService.get(basePath + path).then(response => {
            return createFolder(folder_api_adapter(response));
        });
    },
    getDocument(path, contentType) {
        return AuthApiService.get(basePath + path, {"Content-Type": contentType});
    },
};

export default DocumentService;
