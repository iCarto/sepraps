import {FormProvider, useFieldArray, useForm} from "react-hook-form";

import {useDomain} from "sepraps/domain/provider";
import {PRODUCT_FREQUENCY_MONTHLY} from "payment/model";

import {AlertError} from "base/error/components";
import {
    FormDatePicker,
    FormInputInteger,
    FormInputText,
    FormSelect,
} from "base/form/components";
import {DateUtil} from "base/format/utilities";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {PaperContainer} from "base/shared/components";
import {LightHeading} from "base/ui/headings/components";
import {useEffect} from "react";

const PaymentsFormWizard = ({
    onSubmit,
    onCancel = null,
    error = null,
    saving = false,
    defaultFrecuencyType = "",
    defaultNumberOfProducts = null,
    defaultStartDate = null,
}) => {
    const {productFrequencyTypes} = useDomain();

    const formMethods = useForm({
        defaultValues: {
            frequency_type: defaultFrecuencyType,
            number_of_products:
                defaultFrecuencyType === PRODUCT_FREQUENCY_MONTHLY
                    ? defaultNumberOfProducts
                    : 8,
            start_date:
                defaultFrecuencyType === PRODUCT_FREQUENCY_MONTHLY
                    ? defaultStartDate
                    : null,
            products: [],
        },
    });
    const {fields} = useFieldArray({
        control: formMethods.control,
        name: "products",
    });

    useEffect(() => {
        refreshForm();
    }, [defaultFrecuencyType, defaultNumberOfProducts, defaultStartDate]);

    const frequencyType = formMethods.watch("frequency_type");
    const nameTypeOptions = [
        {value: "pago", label: "Pago {nº}"},
        {value: "mes_anho", label: "{mes}/{año}"},
    ];

    const getProductName = (nameType, index) => {
        if (nameType === "pago") {
            return `Pago ${index + 1}`;
        }
        if (nameType === "mes_anho") {
            const values = formMethods.getValues();
            const expected_approval_date =
                values["products"][index]?.expected_approval_date;
            if (expected_approval_date) {
                const date = DateUtil.parseDateFromApi(expected_approval_date);
                return `${`${date.getMonth() + 1}`.padStart(
                    2,
                    "0"
                )}/${date.getFullYear()}`;
            }
            return null;
        }
        return null;
    };

    const getProductDate = (frequencyType, date) => {
        if (frequencyType === PRODUCT_FREQUENCY_MONTHLY) {
            return date;
        }
        return null;
    };

    const refreshForm = () => {
        const values = formMethods.getValues();
        const products = [];
        const nameType = values["name_type"];
        const frequencyType = values["frequency_type"];
        let startDate = values["start_date"];
        for (let i = 0; i < parseInt(values["number_of_products"]); i++) {
            const defaultValue = {
                expected_approval_date:
                    getProductDate(frequencyType, startDate) || null,
                name: getProductName(nameType, i) || null,
            };
            products.push(defaultValue);
            if (startDate) {
                startDate = DateUtil.formatDateForAPI(DateUtil.addMonths(startDate, 1));
            }
        }
        console.log({products});
        formMethods.reset({
            ...values,
            products,
        });
    };

    const onFormSubmit = data => {
        onSubmit(data.products);
    };

    return (
        <FormProvider {...formMethods}>
            <PaperContainer>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <FormSelect
                            name="frequency_type"
                            label="Frecuencia de entrega"
                            options={productFrequencyTypes}
                            rules={{required: "El campo es obligatorio"}}
                            onChangeHandler={refreshForm}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormInputInteger
                            label="Número de productos"
                            name="number_of_products"
                            rules={{required: "El campo es obligatorio"}}
                            onBlurHandler={refreshForm}
                        />
                    </Grid>
                    {frequencyType === PRODUCT_FREQUENCY_MONTHLY && (
                        <Grid item xs={3}>
                            <FormDatePicker
                                label="Fecha de inicio prevista"
                                name="start_date"
                                onChangeHandler={refreshForm}
                            />
                        </Grid>
                    )}
                    <Grid item xs={3}>
                        <FormSelect
                            name="name_type"
                            label="Tipo de nombre"
                            options={nameTypeOptions}
                            onChangeHandler={refreshForm}
                        />
                    </Grid>
                </Grid>
                <Paper sx={{p: 3, mt: 3}}>
                    <LightHeading>Productos</LightHeading>
                    <AlertError error={error} />
                    <TableContainer sx={{overflowX: "auto"}}>
                        <Table
                            aria-labelledby="Projects table"
                            sx={{tableLayout: "fixed"}}
                        >
                            <TableBody>
                                {fields.map((field, index) => (
                                    <TableRow key={field.id}>
                                        <TableCell
                                            key={`name-${field.id}`}
                                            sx={{
                                                width: "40%",
                                            }}
                                        >
                                            <FormInputText
                                                label="Nombre del producto"
                                                name={`products.${index}.name`}
                                                rules={{
                                                    required: "Valor obligatorio",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: "20%",
                                            }}
                                        >
                                            <FormDatePicker
                                                label="Fecha prevista"
                                                name={`products.${index}.expected_approval_date`}
                                                rules={{
                                                    required:
                                                        frequencyType ===
                                                        PRODUCT_FREQUENCY_MONTHLY
                                                            ? "Valor obligatorio"
                                                            : null,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        {onCancel && !saving && (
                            <Button sx={{ml: 2}} onClick={onCancel}>
                                Cancelar
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 2}}
                            onClick={formMethods.handleSubmit(onFormSubmit)}
                            disabled={saving}
                        >
                            Guardar
                            {saving && (
                                <CircularProgress
                                    color="inherit"
                                    size={20}
                                    sx={{marginLeft: 2}}
                                />
                            )}
                        </Button>
                    </Grid>
                </Paper>
            </PaperContainer>
        </FormProvider>
    );
};

export default PaymentsFormWizard;
