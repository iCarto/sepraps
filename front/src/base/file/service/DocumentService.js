import {
    folder_api_adapter,
    createFolder,
    createDocument,
    document_api_adapter,
} from "base/file/model";
import {AuthApiService} from "base/api/service";

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

    getDocument(idDocument) {
        return AuthApiService.get(basePath + idDocument).then(response => {
            return createDocument(document_api_adapter(response));
        });
    },

    delete(path) {
        return AuthApiService.delete(basePath + path);
    },

    preview(url, contentType) {
        return AuthApiService.get(url);
    },

    download(path, contentType) {
        return AuthApiService.get(`${basePath}download/${path}`, {
            "Content-Type": contentType,
        });
    },

    upload(
        file,
        path,
        onFinish = () => {},
        onProgress = () => {},
        onAbort = () => {},
        onError = () => {}
    ) {
        return AuthApiService.upload(
            file,
            basePath + path + "/" + file.name,
            onFinish,
            onProgress,
            onAbort,
            onError
        );
    },
};

export default DocumentService;
