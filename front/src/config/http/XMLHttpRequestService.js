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
    upload(file, url, headers = {}, onFinish = () => {}, onProgress = () => {}) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", readUrl(url), true);
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
        });
        xhr.onload = onFinish;

        // Listen to the upload progress.
        xhr.upload.onprogress = onProgress;

        xhr.send(file);
    },
};

export default XMLHttpRequestService;
