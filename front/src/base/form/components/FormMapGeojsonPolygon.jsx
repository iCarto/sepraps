import {useEffect} from "react";
import {useController, useFormContext} from "react-hook-form";
import {MapPolygonForm} from "base/component/geo";
import Stack from "@mui/material/Stack";
import {AlertError} from "../presentational";

const FormMapGeojsonPolygon = ({
    name: propsName,
    orientation = "row",
    layer,
    rules = {},
}) => {
    const {getValues, reset} = useFormContext();

    const {
        fieldState: {error},
    } = useController({
        name: propsName,
        rules,
    });

    const geom = getValues()[propsName];

    const handleMapChangeLocation = data => {
        const coordinates = data.features.map(feature => feature.geometry.coordinates);
        const geom = {type: "MultiPolygon", coordinates};
        updateFormValues(geom);
    };

    const updateFormValues = geojson => {
        console.log("updateFormValues", {geojson});
        const values = getValues();
        values[propsName] = {...geojson};

        reset({
            ...values,
        });
    };

    return (
        <Stack spacing={2} sx={{width: "100%", height: "100%"}}>
            <AlertError error={error} />
            <MapPolygonForm
                geom={geom}
                layer={layer}
                onLayerUpdated={handleMapChangeLocation}
            />
        </Stack>
    );
};

export default FormMapGeojsonPolygon;
