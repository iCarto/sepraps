import {
    folder_api_adapter,
    createFolder,
    createDocument,
    document_api_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/documents/";

const DocumentService = {
    get(path) {
        return AuthApiService.get(basePath + path).then(response => {
            if (response.media_type === "FOLDER") {
                return createFolder(folder_api_adapter(response));
            }
            return createDocument(document_api_adapter(response));
        });
    },

    download(path, contentType) {
        return AuthApiService.get(basePath + path + "?action=download", {
            "Content-Type": contentType,
        });
    },

    upload(file, path, onFinish = () => {}, onProgress = () => {}) {
        AuthApiService.upload(
            file,
            basePath + path + "/" + file.name,
            onFinish,
            onProgress
        );
    },
};

export default DocumentService;
