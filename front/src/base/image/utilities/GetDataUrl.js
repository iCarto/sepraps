export function useGetDataUrl() {
    const createBlob = async response => {
        const blob = await response.blob();
        return blob;
    };

    // Refactor this
    const blobToDataUrl = blob => {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = function() {
                let dataUrl = reader.result;
                resolve(dataUrl);
            };
            reader.readAsDataURL(blob);
        });
    };

    const getDataUrl = async url => {
        const blob = await createBlob(url);
        const dataUrl = await blobToDataUrl(blob);
        return dataUrl;
    };

    return getDataUrl;
}
