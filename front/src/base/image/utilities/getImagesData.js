import {AuthService} from "base/api/service";

export function getImagesData(images) {
    console.log({images});
    const promises = images.map(image => {
        if (!image) {
            return null;
        }
        return new Promise((resolve, reject) => {
            const img = new Image();

            fetch(image.url, {
                headers: {
                    Authorization: "Bearer " + AuthService.getAccessToken(),
                },
            }).then(res => {
                if (res.ok) {
                    res.blob().then(b => {
                        img.src = URL.createObjectURL(b);
                    });
                } else {
                    console.error(res);
                }
            });

            img.onload = function() {
                const imageData = {
                    url: img.src, // new blob url
                    width: img.width,
                    height: img.height,
                    label: image.label,
                };
                resolve(imageData);
            };
            img.onerror = function() {
                reject(new Error("No se pudo cargar la imagen: " + image.url));
            };
        });
    });

    return Promise.all(promises);
}
