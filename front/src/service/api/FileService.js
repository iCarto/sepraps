import AuthApiService from "./AuthApiService";

const FileService = {
    download(path, contentType) {
        return AuthApiService.get(path, {
            Accept: contentType,
            "Content-Type": contentType,
        });
    },
};

export default FileService;
