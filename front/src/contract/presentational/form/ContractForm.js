import {useNavigate, useOutletContext} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {NumberUtil} from "base/format/utilities";
import {createContract} from "contract/model";
import {DomainProvider} from "sepraps/domain/provider";

import {
    ContractCreationForm,
    ContractGeneralDataFormFields,
    ContractAwardingFormFields,
    ContractExecutionFormFields,
    ContractBidRequestFormFields,
    ContractFinancingFormFields,
    ContractPostConstructionFormFields,
} from ".";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ContractForm = ({onSubmit, updatedSection = null}) => {
    const navigate = useNavigate();

    // TODO: Review how to manage outlet context to extract contract properly
    let contract;
    const outletContext = useOutletContext();
    if (outletContext) {
        contract = outletContext[0];
    }

    const defaultFormValues = {
        id: contract?.id || "",
        contract_number: contract?.number || "",
        comments: contract?.comments || "",
        financing_program: contract?.financing_program || null,
        bid_request_number: contract?.bid_request_number || "",
        bid_request_id: contract?.bid_request_id || "",
        bid_request_date: contract?.bid_request_date || "",
        // TODO Guaranies don't have decimal fraction, but we have
        // to keep budgets as numbers with decimals
        bid_request_budget: contract?.bid_request_budget
            ? NumberUtil.formatDecimal(contract.bid_request_budget, 0)
            : "",
        awarding_budget: contract?.awarding_budget
            ? NumberUtil.formatDecimal(contract.awarding_budget, 0)
            : "",
        awarding_date: contract?.awarding_date || "",
        execution_signature_date: contract?.execution_signature_date || "",
        execution_certificate_start_date:
            contract?.execution_certificate_start_date || "",
        execution_final_delivery_date: contract?.execution_final_delivery_date || "",
        expected_execution_period: contract?.expected_execution_period || "",
        warranty_end_date: contract?.warranty_end_date || "",
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        const updatedContract = createContract({
            id: data.id,
            number: data.contract_number,
            comments: data.comments,
            financing_program: data.financing_program,
            bid_request_number: data.bid_request_number,
            bid_request_id: data.bid_request_id,
            bid_request_date: data.bid_request_date,
            bid_request_budget: data.bid_request_budget,
            awarding_budget: data.awarding_budget,
            awarding_percentage_drop:
                data.bid_request_budget && data.awarding_budget
                    ? (
                          100 -
                          (data.awarding_budget * 100) / data.bid_request_budget
                      ).toFixed(2)
                    : null,
            awarding_date: data.awarding_date,
            contractor: contract?.contractor,
            execution_signature_date: data.execution_signature_date,
            execution_certificate_start_date: data.execution_certificate_start_date,
            execution_final_delivery_date: data.execution_final_delivery_date,
            expected_execution_period: data.expected_execution_period,
            warranty_end_date: data.warranty_end_date,
            projects: contract ? contract.projects : [],
        });
        onSubmit(updatedContract);
    };

    const handleCancel = () => {
        navigate(`/contracts`);
    };

    const getFormBySection = section => {
        if (section === "generaldata") {
            return <ContractGeneralDataFormFields />;
        }
        if (section === "financing_program") {
            return <ContractFinancingFormFields />;
        }
        if (section === "bidrequest") {
            return <ContractBidRequestFormFields />;
        }
        if (section === "awarding") {
            return <ContractAwardingFormFields />;
        }
        if (section === "execution") {
            return <ContractExecutionFormFields />;
        }
        if (section === "postconstruction") {
            return <ContractPostConstructionFormFields />;
        }
        return null;
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <Box component="form" width="100%">
                    {updatedSection ? (
                        <>
                            {getFormBySection(updatedSection)}
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
                        </>
                    ) : (
                        <ContractCreationForm
                            onCancel={handleCancel}
                            onSubmit={formMethods.handleSubmit(onFormSubmit)}
                        />
                    )}
                </Box>
            </FormProvider>
        </DomainProvider>
    );
};

export default ContractForm;
