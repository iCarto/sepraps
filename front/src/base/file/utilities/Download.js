export function useDownload() {
    let download = async response => {
        const filename = response.headers
            .get("content-disposition")
            .split("filename=")[1];
        console.log({filename});
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

    return download;
}
