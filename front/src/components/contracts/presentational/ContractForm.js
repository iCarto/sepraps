import {useOutletContext} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {createContract} from "model";

import ContractGeneralDataFormFields from "./ContractGeneralDataFormFields";
import ContractAwardingFormFields from "./ContractAwardingFormFields";
import ContractExecutionFormFields from "./ContractExecutionFormFields";
import ContractBidRequestFormFields from "./ContractBidRequestFormFields";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ContractForm = ({section = null, onSubmit}) => {
    // TODO: Review how to manage outlet context to extract contract properly
    let contract;
    const outletContext = useOutletContext();
    if (outletContext) {
        contract = outletContext[0];
    }
    console.log({contract});

    const defaultFormValues = {
        id: contract?.id || "",
        number: contract?.number || "",
        comments: contract?.comments || "",
        bid_request_number: contract?.bid_request_number || "",
        bid_request_id: contract?.bid_request_id || "",
        bid_request_date: contract?.bid_request_date || "",
        bid_request_budget: contract?.bid_request_budget || "",
        bid_request_deadline: contract?.bid_request_deadline || "",
        awarding_budget: contract?.awarding_budget || "",
        awarding_percentage_drop: contract?.awarding_percentage_drop || "",
        awarding_date: contract?.awarding_date || "",
        execution_signature_date: contract?.execution_signature_date || "",
        execution_order_start_date: contract?.execution_order_start_date || "",
        execution_certificate_start_date:
            contract?.execution_certificate_start_date || "",
        execution_expected_delivery_date:
            contract?.execution_expected_delivery_date || "",
        execution_final_delivery_date: contract?.execution_final_delivery_date || "",
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        console.log("submit", {contract});
        const updatedProvider = createContract({
            id: data.id,
            number: data.number,
            comments: data.comments,
            bid_request_number: data.bid_request_number,
            bid_request_id: data.bid_request_id,
            bid_request_date: data.bid_request_date,
            bid_request_budget: data.bid_request_budget,
            bid_request_deadline: data.bid_request_deadline,
            awarding_budget: data.awarding_budget,
            awarding_percentage_drop: data.awarding_percentage_drop,
            awarding_date: data.awarding_date,
            contractor: contract?.contractor,
            execution_signature_date: data.execution_signature_date,
            execution_order_start_date: data.execution_order_start_date,
            execution_certificate_start_date: data.execution_certificate_start_date,
            execution_expected_delivery_date: data.execution_expected_delivery_date,
            execution_final_delivery_date: data.execution_final_delivery_date,
            projects: contract ? contract.projects.map(project => project.id) : [],
        });
        onSubmit(updatedProvider);
    };

    return (
        <FormProvider {...formMethods}>
            <Box component="form">
                <Grid container>
                    <Grid item container xs={12}>
                        {!section || section === "generaldata" ? (
                            <ContractGeneralDataFormFields />
                        ) : null}
                        {!section || section === "bidrequest" ? (
                            <ContractBidRequestFormFields />
                        ) : null}
                        {!section || section === "awarding" ? (
                            <ContractAwardingFormFields />
                        ) : null}
                        {!section || section === "execution" ? (
                            <ContractExecutionFormFields />
                        ) : null}
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{mt: 2}}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 2}}
                        onClick={formMethods.handleSubmit(onFormSubmit)}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default ContractForm;
