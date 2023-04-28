import {FileUtil} from "base/file/utilities";

export function useDownloadChart() {
    let DownloadChartButton = async (base64, filename) => {
        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await FileUtil.convertBase64toBlob(base64);
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = filename;
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);
    };

    return DownloadChartButton;
}
