export function getImagesData(urls) {
    const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function() {
                const imageData = {
                    url: url,
                    width: img.width,
                    height: img.height,
                };
                resolve(imageData);
            };
            img.onerror = function() {
                reject(new Error("No se pudo cargar la imagen: " + url));
            };
            img.src = url;
        });
    });

    return Promise.all(promises);
}
