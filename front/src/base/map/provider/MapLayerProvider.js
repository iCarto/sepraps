import {useState} from "react";

export function useMapLayerProvider(service, options = null) {
    const [included, setIncluded] = useState(options?.included || false);
    const [items, setItems] = useState(options?.items || null);
    const [hidden, setHidden] = useState(options?.hidden || false);
    const [loading, setLoading] = useState(false);
    const [discriminator, setDiscriminator] = useState(options?.discriminator);
    const [filter, setFilter] = useState(options?.filter || null);
    const [detail, setDetail] = useState(options?.detail || false);

    const loadMapData = () => {
        if (included && !hidden) {
            setLoading(true);
            service(filter).then(items => {
                setItems(items);
                setLoading(false);
            });
        }
    };

    return [
        {
            included,
            items,
            setItems,
            hidden,
            setHidden,
            loading,
            setLoading,
            discriminator,
            setDiscriminator,
            filter,
            setFilter,
            detail,
            setDetail,
            loadMapData,
        },
    ];
}
