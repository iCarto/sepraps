import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigateWithReload} from "hooks";
import {createContractor} from "model";
import {ContractorService} from "service/api";
import {DomainProvider} from "components/common/provider";

import {SidebarPanel} from "layout";
import {
    ContractorFormFields,
    ContractorFormSearch,
} from "components/contractor/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// TO-DO: REFACTOR
// action === "edit" conditionals (use constants?)

const UpdateContractContractorPanel = () => {
    const {action} = useParams();

    const [selectedOption, setSelectedOption] = useState("form");
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const formMethods = useForm({
        defaultValues:
            action === "edit"
                ? {
                      id: contract?.contractor?.id,
                      name: contract?.contractor?.name,
                      contractor_type: contract?.contractor?.contractor_type,
                      phone: contract?.contractor?.phone,
                      email: contract?.contractor?.email,
                  }
                : {
                      id: null,
                      name: "",
                      contractor_type: "",
                      phone: "",
                      emial: "",
                  },
        reValidateMode: "onSubmit",
    });

    const onSubmit = data => {
        const updatedContractor = createContractor({
            id: data.id,
            name: data.name,
            contractor_type: data.contractor_type,
            phone: data.phone,
            email: data.email,
            contract: contract.id,
        });
        handleFormSubmit(updatedContractor);
    };

    const handleFormSubmit = contractor => {
        const serviceAction = contractor.id
            ? ContractorService.updateContractor
            : ContractorService.createContractor;
        serviceAction(contractor)
            .then(() => {
                navigate(`/contracts/${contract.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/contracts/${contract.id}`);
    };

    const changeContractorFormValues = contractor => {
        const values = formMethods.getValues();
        values["id"] = contractor.id;
        values["name"] = contractor.name;
        values["contractor_type"] = contractor.contractor_type;
        values["phone"] = contractor.phone;
        values["email"] = contractor.email;
        formMethods.reset({
            ...values,
        });
    };

    const handleChange = (event, selectedOption) => {
        setSelectedOption(selectedOption);
        changeContractorFormValues(createContractor());
    };

    const handleSelectExistingContractor = selectedExistingContractor => {
        changeContractorFormValues(selectedExistingContractor);
    };

    return (
        <SidebarPanel>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Box component="form">
                        <Grid container>
                            <Grid item xs={12} sx={{mb: 2}}>
                                <Typography variant="h5">Contratista</Typography>
                            </Grid>
                            {/* {error && (
                                <Alert severity="error">
                                    {error} sx={{mb: 2}}
                                </Alert>
                            )} */}
                            <Grid item container justifyContent="center" xs={12}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={selectedOption}
                                    exclusive
                                    onChange={handleChange}
                                >
                                    <ToggleButton value="form">
                                        {action === "edit"
                                            ? "Modificar"
                                            : "Crear nuevo"}
                                    </ToggleButton>
                                    <ToggleButton value="existing">
                                        Seleccionar existente
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item container xs={12}>
                                {selectedOption === "form" ? (
                                    <ContractorFormFields />
                                ) : (
                                    <ContractorFormSearch
                                        handleSelect={handleSelectExistingContractor}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" sx={{mt: 2}}>
                            <Button color="inherit" onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ml: 2}}
                                onClick={formMethods.handleSubmit(onSubmit)}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Box>
                </FormProvider>
            </DomainProvider>
        </SidebarPanel>
    );
};

export default UpdateContractContractorPanel;
