const urlBase = process.env.REACT_APP_API_BASE_URL;

/**
 * @param {string}  url url a la cual consultar
 * esta funcion detecta si es una nueva url base (comienza con http:// o https://).
 * en caso de ser asi, retorna la url. en caso contrario, se asume que es un fragmento
 * de path por lo que se concatena con la constante urlBase
 **/
const readUrl = (url = "") =>
    url.startsWith("http://") || url.startsWith("https://") ? url : `${urlBase}${url}`;

const XMLHttpRequestService = {
    upload(
        file,
        url,
        headers = {},
        onFinish = (file, event) => {},
        onProgress = (file, progress, event) => {},
        onAbort = (file, event) => {},
        onError = (file, event) => {}
    ) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", readUrl(url), true);
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
        });

        const uploadingFile = {
            file,
            name: file.name,
            progress: 0,
            request: xhr,
            stored: false,
            error: null,
        };

        xhr.upload.addEventListener("loadstart", function(e) {
            // When the request starts.
            console.log("loadstart", {e});
        });
        xhr.upload.addEventListener("progress", function(e) {
            // While sending and loading data.
            console.log("progress", {e});
            onProgress(
                {
                    ...uploadingFile,
                    progress: (e.loaded * 100) / e.total,
                },
                e
            );
        });
        xhr.upload.addEventListener("load", function(e) {
            // When the request has *successfully* completed.
            // Even if the server hasn't responded that it finished.
            console.log("load", {e});
        });
        xhr.upload.addEventListener("loadend", function(e) {
            // When the request has completed (either in success or failure).
            // Just like 'load', even if the server hasn't
            // responded that it finished processing the request.
            console.log("loadend", {e});
        });
        xhr.upload.addEventListener("error", function(e) {
            // When the request has failed while uploading
            console.log("error", {e});
            onError(
                {
                    ...uploadingFile,
                    error: "Se ha producido un error mientras se subía el archivo.",
                },
                e
            );
        });
        xhr.upload.addEventListener("abort", function(e) {
            // When the request has been aborted while uploading
            // For instance, by invoking the abort() method.
            console.log("abort", {e});
            onAbort(file, e);
        });
        xhr.upload.addEventListener("timeout", function(e) {
            // When the author specified timeout has passed
            // before the request could complete.
            console.log("timeout", {e});
        });

        xhr.addEventListener("readystatechange", function(e) {
            // 0 	UNSENT 	Client has been created. open() not called yet.
            // 1 	OPENED 	open() has been called.
            // 2 	HEADERS_RECEIVED 	send() has been called, and headers and status are available.
            // 3 	LOADING 	Downloading; responseText holds partial data.
            // 4 	DONE 	The operation is complete.
            if (this.readyState === 4) {
                // the transfer has completed and the server closed the connection.
                console.log("readystatechange", {e}, {xhr});
                if (this.status === 200 || this.status === 201) {
                    onFinish(
                        {
                            ...uploadingFile,
                            progress: 100,
                            stored: true,
                        },
                        e
                    );
                } else {
                    onError(
                        {
                            ...uploadingFile,
                            error: "Se ha producido un error al almacenar el archivo.",
                        },
                        e
                    );
                }
            }
        });

        xhr.send(file);

        return uploadingFile;
    },
};

export default XMLHttpRequestService;
