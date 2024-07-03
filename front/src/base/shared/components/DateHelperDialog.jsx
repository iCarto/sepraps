import {useEffect, useState} from "react";

import {theme} from "Theme";
import {DateUtil} from "base/format/utilities";

import {DialogLayout} from "base/dialog/components";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const DateHelperDialog = ({isDialogOpen, onAcceptDialog, onCloseDialog}) => {
    const [finalDate, setFinalDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [quantityType, setQuantityType] = useState("days");
    const [quantity, setQuantity] = useState(null);

    const handleAcceptDialog = () => {
        onAcceptDialog(finalDate);
        onCloseDialog();
    };

    useEffect(() => {
        if (selectedDate && quantity) {
            const resultDate =
                quantityType === "years"
                    ? DateUtil.addYears(selectedDate, quantity)
                    : quantityType === "months"
                    ? DateUtil.addMonths(selectedDate, quantity)
                    : DateUtil.addDays(selectedDate, quantity);
            setFinalDate(resultDate);
        } else {
            setFinalDate(null);
        }
    }, [selectedDate, quantityType, quantity]);

    return (
        <DialogLayout
            dialogTitle="Calculadora de fechas"
            dialogHeading={`Seleccione una fecha en el calendario y ayúdese de las operaciones proporcionadas para encontrar la fecha buscada`}
            dialogContent={
                <Paper elevation={3}>
                    <Stack direction="row" justifyContent="center" sx={{p: 2}}>
                        <Box
                            sx={{
                                border: 1,
                                borderRadius: 2,
                                borderColor: "grey.300",
                                p: 1,
                                m: 1,
                            }}
                        >
                            <StaticDatePicker
                                renderInput={null}
                                value={selectedDate}
                                onChange={value => {
                                    console.log({value});
                                    setSelectedDate(value);
                                }}
                                showToolbar={false}
                                componentsProps={{
                                    actionBar: {
                                        actions: [],
                                    },
                                }}
                            />
                        </Box>
                        <Stack>
                            <FormControl>
                                <InputLabel id="quantity-type-selector">
                                    Tipo de cantidad
                                </InputLabel>
                                <Select
                                    labelId="quantity-type-selector"
                                    id="quantity-type-selector"
                                    value={quantityType}
                                    label="Tipo de cantidad"
                                    onChange={event =>
                                        setQuantityType(event.target.value)
                                    }
                                    sx={{minWidth: "170px"}}
                                >
                                    <MenuItem value={"days"}>Días</MenuItem>
                                    <MenuItem value={"months"}>Meses</MenuItem>
                                    <MenuItem value={"years"}>Años</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="quantity-input"
                                    type="number"
                                    label="Cantidad añadida"
                                    value={quantity}
                                    onChange={event => setQuantity(event.target.value)}
                                />
                            </FormControl>
                            <Stack alignItems="center" sx={{mt: 3}}>
                                <Typography sx={{color: "grey.600"}}>
                                    Fecha resultante:
                                </Typography>
                                <Typography variant="h5">
                                    {finalDate ? DateUtil.formatDate(finalDate) : "-"}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
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

export default DateHelperDialog;
