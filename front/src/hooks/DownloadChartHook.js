import {FileUtil} from "utilities";

export function useDownloadChart() {
    let downloadChart = async (base64, filename) => {
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

    return downloadChart;
}
