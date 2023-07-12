import {AuthService} from "base/api/service";

export function getImagesData(urls) {
    const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            fetch(url, {
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
                };
                resolve(imageData);
            };
            img.onerror = function() {
                reject(new Error("No se pudo cargar la imagen: " + url));
            };
        });
    });

    return Promise.all(promises);
}
