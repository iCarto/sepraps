// import { AuthApiService } from "../../api/service";
import {
    createDocument,
    createFolder,
    document_api_adapter,
    folder_api_adapter,
} from "../../file/model";

const basePath = "/api/documents/";

const DocumentService = {
    get(path) {
        console.log("DocumentService");
        // return AuthApiService.get(basePath + path).then(response => {
        //     if (response.media_type === "FOLDER") {
        //         return createFolder(folder_api_adapter(response));
        //     }
        //     return createDocument(document_api_adapter(response));
        // });
    },

    delete(path) {
        console.log("DocumentService");
        // return AuthApiService.delete(basePath + path);
    },

    preview(url, contentType) {
        console.log("DocumentService");
        // return AuthApiService.get(url);
    },

    download(path, contentType) {
        console.log("DocumentService");
        // return AuthApiService.get(`${basePath}download/${path}`, {
        //     "Content-Type": contentType,
        // });
    },

    upload(
        file,
        path,
        onFinish = () => {},
        onProgress = () => {},
        onAbort = () => {},
        onError = () => {}
    ) {
        console.log("DocumentService");
        // return AuthApiService.upload(
        //     file,
        //     basePath + path + "/" + file.name,
        //     onFinish,
        //     onProgress,
        //     onAbort,
        //     onError
        // );
    },
};

export default DocumentService;
