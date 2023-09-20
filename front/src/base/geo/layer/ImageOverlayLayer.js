import L from "leaflet";
import {useRef} from "react";

class ImageOverlayLayerLegend {
    #layerName;
    #layerType;
    #legendItems;

    constructor(layerName, layerType, legendItems) {
        this.#layerName = layerName;
        this.#layerType = layerType;
        this.#legendItems = legendItems;
    }

    get layerName() {
        return this.#layerName;
    }

    get layerType() {
        return this.#layerType;
    }

    get legendItems() {
        return this.#legendItems;
    }
}
export function createImageOverlayLayerLegend({
    layerName,
    layerType = null,
    legendItems = null,
}) {
    return new ImageOverlayLayerLegend(layerName, layerType, legendItems);
}

export class ImageOverlayLayer {
    #layerRef;
    #mapRef;
    #imageUrl;
    #imageBounds;
    #opacity;
    #legend;
    #otherLayerOptions;

    get layerRef() {
        return this.#layerRef;
    }

    get mapRef() {
        return this.#mapRef;
    }

    get legend() {
        return this.#legend;
    }

    get otherLayerOptions() {
        return this.#otherLayerOptions;
    }

    constructor(
        layerRef,
        mapRef,
        imageUrl,
        imageBounds,
        legend,
        opacity,
        otherLayerOptions
    ) {
        this.#layerRef = layerRef;
        this.#mapRef = mapRef;
        this.#imageUrl = imageUrl;
        this.#imageBounds = imageBounds;
        this.#legend = legend;
        this.#opacity = opacity;
        this.#otherLayerOptions = otherLayerOptions;
    }

    createLayer(map) {
        map.removeLayer(this.layerRef.current);
        this.loading = true;
        this.layerRef.current = L.imageOverlay(
            this.#imageUrl,
            L.latLngBounds(this.#imageBounds)
        );
        this.layerRef.current.addTo(map);
        this.mapRef.current = map;
    }

    updateLayer() {
        this.createLayer(this.mapRef.current);
    }

    clearLayer() {
        if (this.mapRef && this.mapRef.current) {
            this.mapRef.current.removeLayer(this.layerRef.current);
        }
    }
}

export function useImageOverlayLayerObject({
    imageUrl,
    imageBounds,
    legend = null,
    opacity = null,
    otherLayerOptions = null,
}) {
    return new ImageOverlayLayer(
        useRef(L.layerGroup()),
        useRef(null),
        imageUrl,
        imageBounds,
        legend,
        opacity,
        otherLayerOptions
    );
}

export function useImageOverlayLayerObjectWithLegend({legendOptions, layerOptions}) {
    return new ImageOverlayLayer({
        ...layerOptions,
        legend: createImageOverlayLayerLegend(legendOptions),
    });
}
