import {useEffect, useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {ProjUtil, crsType} from "base/map/utilities";
import {MapForm} from "base/map/components";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const FormMapGeojsonPoint = ({
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

    const handleMapChangeLocation = latlng => {
        const transformedCords = ProjUtil.transformFrom4326(latlng.lat, latlng.lng);
        updateFormValues(parseInt(transformedCords.x), parseInt(transformedCords.y));
    };

    const handleFormChangeLocation = (x, y) => {
        if (x && y) {
            updateFormValues(parseInt(x), parseInt(y));
        }
    };

    const updateFormValues = (x, y) => {
        const values = getValues();
        let geom = values[propsName];
        if (!geom) {
            geom = {
                type: "Point",
                crs: crsType,
            };
        }
        values[propsName] = {
            ...geom,
            coordinates: [x, y],
        };
        reset({
            ...values,
        });
    };

    const [coordinates, setCoordinates] = useState({x: "", y: ""});

    useEffect(() => {
        if (geom && geom.coordinates) {
            setCoordinates({x: geom.coordinates[0], y: geom.coordinates[1]});
        }
    }, [geom]);

    return (
        <>
            <Grid container columnSpacing={2} sx={{mb: 1}}>
                <Grid item xs={12} md={orientation === "vertical" ? 12 : 6}>
                    <TextField
                        label="Coordenada X"
                        value={coordinates.x}
                        onChange={event => {
                            if (isNaN(event.target.value)) {
                                return;
                            }
                            setCoordinates({
                                x: event.target.value,
                                y: coordinates.y,
                            });
                        }}
                        onBlur={event =>
                            handleFormChangeLocation(coordinates.x, coordinates.y)
                        }
                        error={Boolean(error)}
                        helperText={error?.message}
                        InputLabelProps={{shrink: true}}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={orientation === "vertical" ? 12 : 6}>
                    <TextField
                        label="Coordenada Y"
                        value={coordinates.y}
                        onChange={event => {
                            if (isNaN(event.target.value)) {
                                return;
                            }
                            setCoordinates({
                                x: coordinates.x,
                                y: event.target.value,
                            });
                        }}
                        onBlur={event =>
                            handleFormChangeLocation(coordinates.x, coordinates.y)
                        }
                        error={Boolean(error)}
                        helperText={error?.message}
                        InputLabelProps={{shrink: true}}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <MapForm geom={geom} layer={layer} onClick={handleMapChangeLocation} />
        </>
    );
};

export default FormMapGeojsonPoint;
