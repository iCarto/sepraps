import L from "leaflet";
import {useRef} from "react";

class TileLayerLegend {
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
export function createTileLayerLegend({
    layerName,
    layerType = null,
    legendItems = null,
}) {
    return new TileLayerLegend(layerName, layerType, legendItems);
}

export class TileLayer {
    #layerRef;
    #mapRef;
    #urlTemplate;
    #layers;
    #format;
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
        urlTemplate,
        layers,
        format,
        opacity,
        legend,
        otherLayerOptions
    ) {
        this.#layerRef = layerRef;
        this.#mapRef = mapRef;
        this.#urlTemplate = urlTemplate;
        this.#layers = layers;
        this.#format = format;
        this.#opacity = opacity;
        this.#legend = legend;
        this.#otherLayerOptions = otherLayerOptions;
    }

    createLayer(map) {
        map.removeLayer(this.layerRef.current);
        this.loading = true;
        const layerOptions = {
            layers: this.#layers,
            format: this.#format,
            opacity: this.#opacity,
            ...this.otherLayerOptions,
        };
        console.log({layerOptions});
        this.layerRef.current = L.tileLayer.wms(this.#urlTemplate, layerOptions);
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

export function useTileLayerObject({
    urlTemplate = null,
    layers = null,
    format = null,
    opacity = null,
    legend = null,
    otherLayerOptions = null,
}) {
    return new TileLayer(
        useRef(L.layerGroup()),
        useRef(null),
        urlTemplate,
        layers,
        format,
        opacity,
        legend,
        otherLayerOptions
    );
}

export function useTileLayerObjectWithLegend({legendOptions, layerOptions}) {
    return new TileLayer({
        ...layerOptions,
        legend: createTileLayerLegend(legendOptions),
    });
}
