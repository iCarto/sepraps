import {AuthApiService} from "base/api/service";

const FileService = {
    download(path, contentType) {
        console.log("FileService", path);
        return AuthApiService.get(path, {
            Accept: contentType,
            "Content-Type": contentType,
        });
    },
};

export default FileService;
