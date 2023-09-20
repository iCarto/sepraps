import {useEffect, useState} from "react";

export function useWMSMapLayerProvider(layer, options) {
    const [included, setIncluded] = useState(options?.included);
    const [visible, setVisible] = useState(
        options?.visible != null ? options?.visible : true
    );

    const showLayer = show => {
        setVisible(show);
    };

    return [
        {
            layer,
            included,
            setIncluded,
            visible,
            showLayer,
            useProvider: function() {
                useEffect(() => {
                    if (visible && included) {
                        layer.updateLayer();
                    } else {
                        layer.clearLayer();
                    }
                }, [included, visible]);
            },
        },
    ];
}
