import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {NumberUtil} from "base/format/utilities";
import L from "leaflet";
import "leaflet.utm";

import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import OldMapForm from "base/map/components/OldMapForm";

/// TO-DO: Adapt based on GADPO

const FormMapCoordinates = ({
    name: propsName,
    orientation = "column",
    required = false,
}) => {
    const {getValues, reset} = useFormContext();

    const [utmCoords, setUtmCoords] = useState({x: "", y: "", zone: 21});

    const handleMapChangeLocation = latlng => {
        const utmCoords = latlng.utm();
        console.log({utmCoords});
        setUtmCoords({
            x: Math.trunc(utmCoords.x).toString(),
            y: Math.trunc(utmCoords.y).toString(),
            zone: utmCoords.zone,
        });

        updateFormValues(latlng);
    };

    const updateFormValues = latlng => {
        const values = getValues();
        const coordinates = values[propsName];
        values[propsName] = {
            ...coordinates,
            latitude: NumberUtil.formatDecimal(latlng.lat, 5),
            longitude: NumberUtil.formatDecimal(latlng.lng, 5),
        };
        reset({
            ...values,
        });
    };

    const handleFormChangeLocation = utmCoords => {
        if (utmCoords.x && utmCoords.y && utmCoords.zone) {
            const latlng = L.utm({
                x: utmCoords.x,
                y: utmCoords.y,
                zone: utmCoords.zone,
                southHemi: true,
            }).latLng();

            updateFormValues(latlng);
        }
    };

    const handleFormChangeZone = (oldUtmCoords, newZone) => {
        const utmCoords = {
            x: oldUtmCoords.x,
            y: oldUtmCoords.y,
            zone: newZone,
        };
        handleFormChangeLocation(utmCoords);
        setUtmCoords(utmCoords);
    };

    const coordinates = getValues()[propsName];

    useEffect(() => {
        if (coordinates.latitude && coordinates.longitude) {
            var utmCoords = L.latLng(
                NumberUtil.parseFloat(coordinates.latitude),
                NumberUtil.parseFloat(coordinates.longitude)
            ).utm();

            setUtmCoords({
                x: Math.trunc(utmCoords.x).toString(),
                y: Math.trunc(utmCoords.y).toString(),
                zone: utmCoords.zone,
            });
        }
    }, [coordinates]);

    return (
        <>
            <Grid container justifyContent="space-between" spacing={1} sx={{mb: 1}}>
                <Grid item xs={12} md={orientation === "column" ? 12 : 4}>
                    <FormControl fullWidth>
                        <TextField
                            value={utmCoords.x}
                            onChange={event => {
                                setUtmCoords(oldUtmCoords => {
                                    return {
                                        x: event.target.value,
                                        y: oldUtmCoords.y,
                                        zone: oldUtmCoords.zone,
                                    };
                                });
                            }}
                            onBlur={() => handleFormChangeLocation(utmCoords)}
                            label="Coordenada X"
                            InputLabelProps={{shrink: true}}
                            required={required}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={orientation === "column" ? 12 : 4}>
                    <FormControl fullWidth>
                        <TextField
                            value={utmCoords.y}
                            onChange={event => {
                                setUtmCoords(oldUtmCoords => {
                                    return {
                                        x: oldUtmCoords.x,
                                        y: event.target.value,
                                        zone: oldUtmCoords.zone,
                                    };
                                });
                            }}
                            onBlur={() => handleFormChangeLocation(utmCoords)}
                            label="Coordenada Y"
                            InputLabelProps={{shrink: true}}
                            required={required}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={orientation === "column" ? 12 : 4}>
                    <FormControl fullWidth>
                        <InputLabel id="utm-zone" shrink>
                            Zona UTM
                        </InputLabel>
                        <Select
                            labelId="label-zone"
                            id="zone"
                            value={utmCoords.zone}
                            label="utm-zone"
                            onChange={event => {
                                handleFormChangeZone(utmCoords, event.target.value);
                            }}
                            input={<OutlinedInput notched label="Zona UTM" />}
                            required={required}
                        >
                            <MenuItem value={21}>Centro y Este (Zona-21)</MenuItem>
                            <MenuItem value={20}>Oeste (Zona-20)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <OldMapForm
                onClick={handleMapChangeLocation}
                latitude={NumberUtil.parseFloat(coordinates.latitude)}
                longitude={NumberUtil.parseFloat(coordinates.longitude)}
            />
        </>
    );
};

export default FormMapCoordinates;
