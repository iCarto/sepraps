import {useEffect, useState} from "react";

import {theme} from "Theme";
import {NumberUtil} from "base/format/utilities";

import {DialogLayout} from "base/dialog/components";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const NumberHelperDialog = ({
    isDialogOpen,
    onAcceptDialog,
    onCloseDialog,
    calculatorOptions,
}) => {
    const [finalValue, setFinalValue] = useState(null);
    const [valueType, setValueType] = useState(null);
    const [percentage, setPercentage] = useState(null);

    const handleAcceptDialog = () => {
        onAcceptDialog(finalValue);
        onCloseDialog();
    };

    useEffect(() => {
        if (valueType && percentage) {
            const resultValue = Math.round(valueType.value * (percentage / 100));
            setFinalValue(resultValue);
        } else {
            setFinalValue(null);
        }
    }, [valueType, percentage]);

    return (
        <DialogLayout
            dialogTitle="Calculadora de cantidades"
            dialogHeading={`Seleccione un número inicial y aplique el porcentaje que desee`}
            dialogContent={
                <Paper elevation={3}>
                    <Grid container alignItems="center" sx={{p: 1}} spacing={1}>
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel id="value-type-selector">
                                    Dato de partida
                                </InputLabel>
                                <Select
                                    labelId="value-type-selector"
                                    id="value-type-selector"
                                    value={valueType?.optionValue}
                                    label="Dato de partida"
                                    onChange={event => {
                                        const selectedTypeValue = event.target.value;
                                        setValueType(
                                            calculatorOptions.find(
                                                valueType =>
                                                    valueType.optionValue ===
                                                    selectedTypeValue
                                            )
                                        );
                                    }}
                                    sx={{minWidth: "170px"}}
                                >
                                    {calculatorOptions.map(valueType => (
                                        <MenuItem value={valueType.optionValue}>
                                            {valueType.optionLabel}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <TextField
                                    label="Cantidad de partida"
                                    InputLabelProps={{shrink: true}}
                                    value={
                                        valueType
                                            ? NumberUtil.formatInteger(valueType.value)
                                            : null
                                    }
                                    disabled={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <TextField
                                    id="quantity-input"
                                    type="number"
                                    label="Porcentaje"
                                    value={percentage}
                                    onChange={event =>
                                        setPercentage(event.target.value)
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container xs={12} justifyContent="center">
                            <Stack alignItems="center" sx={{mt: 3}}>
                                <Typography sx={{color: "grey.600"}}>
                                    Número resultante:
                                </Typography>
                                <Typography variant="h5">
                                    {finalValue
                                        ? NumberUtil.formatInteger(finalValue)
                                        : "-"}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            }
            mainActionText="Aceptar"
            onMainActionClick={handleAcceptDialog}
            onHandleDialog={onCloseDialog}
            isDialogOpen={isDialogOpen}
            style={{backgroundColor: theme.palette.pageBackground.secondary}}
            fullWidth
        />
    );
};

export default NumberHelperDialog;
