import DocumentService from "service/api/DocumentService";

export function useDownloadDocument() {
    let downloadDocument = async (name, path, content_type) => {
        const result = await DocumentService.download(path, content_type);

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await result.blob();
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = name;
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);
    };

    return downloadDocument;
}
