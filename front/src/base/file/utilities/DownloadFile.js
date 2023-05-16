import {FileService} from "base/file/service";

export function useDownloadFile() {
    let downloadFile = async (path, content_type) => {
        console.log("download");
        const response = await FileService.download(path, content_type);
        const filename = response.headers
            .get("content-disposition")
            .split("filename=")[1];

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await response.blob();
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = filename;
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);
    };

    return downloadFile;
}
