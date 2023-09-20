import {useRef} from "react";
import domtoimage from "dom-to-image";
import {FileUtil} from "base/file/utilities";

export function useDownloadMapAsPng() {
    const mapObjectRef = useRef(null);
    const mapDomRef = useRef(null);

    const setConfig = (mapObject, mapDomElement) => {
        mapObjectRef.current = mapObject;
        mapDomRef.current = mapDomElement;
    };

    const getDimensions = () => {
        return mapObjectRef.current.getSize();
    };

    const generate = async () => {
        var dimensions = getDimensions();

        const dataUrl = await domtoimage.toPng(mapDomRef.current, {
            width: dimensions.x,
            height: dimensions.y,
        });
        return dataUrl;
    };

    const download = async callback => {
        const dataURL = await generate();

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await FileUtil.convertBase64toBlob(dataURL);
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = "map.png";
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);

        if (callback) {
            callback();
        }
    };

    return {setConfig, download, generate, getDimensions};
}
