import {FormProvider, useForm} from "react-hook-form";
import {NumberUtil} from "base/format/utilities";
import {createContract} from "contract/model";
import {DomainProvider} from "sepraps/domain/provider";

import {EntityForm} from "base/entity/components/form";
import {FormUtil} from "base/form/utilities";
import {AlertError} from "base/error/components";

const ContractForm = ({
    contract = null,
    onSubmit,
    onCancel = null,
    error = null,
    children,
}) => {
    const defaultFormValues = {
        id: contract?.id || "",
        contract_number: contract?.number || "",
        comments: contract?.comments || "",
        services: FormUtil.getFormValue(contract?.services, []),
        financing_program: contract?.financing_program || null,
        bid_request_number: contract?.bid_request_number || "",
        bid_request_id: contract?.bid_request_id || "",
        bid_request_lot_number: FormUtil.getFormValue(contract?.bid_request_lot_number),
        bid_request_date: contract?.bid_request_date || "",
        total_amount_type: FormUtil.getFormValue(contract?.total_amount_type),
        product_frequency_type: FormUtil.getFormValue(contract?.product_frequency_type),
        payment_criteria_type: FormUtil.getFormValue(contract?.payment_criteria_type),
        // TODO Guaranies don't have decimal fraction, but we have
        // to keep budgets as numbers with decimals
        bid_request_budget_min: contract?.bid_request_budget_min
            ? NumberUtil.formatDecimal(contract.bid_request_budget_min, 0)
            : "",
        bid_request_budget: contract?.bid_request_budget
            ? NumberUtil.formatDecimal(contract.bid_request_budget, 0)
            : "",
        awarding_budget_min: contract?.awarding_budget_min
            ? NumberUtil.formatDecimal(contract.awarding_budget_min, 0)
            : "",
        awarding_budget: contract?.awarding_budget
            ? NumberUtil.formatDecimal(contract.awarding_budget, 0)
            : "",
        awarding_date: contract?.awarding_date || "",
        awarding_professional_liability_insurance: FormUtil.getFormValue(
            contract?.awarding_professional_liability_insurance
        ),
        awarding_liability_insurance: FormUtil.getFormValue(
            contract?.awarding_liability_insurance
        ),
        awarding_accident_insurance: FormUtil.getFormValue(
            contract?.awarding_accident_insurance
        ),
        execution_signature_date: contract?.execution_signature_date || "",
        execution_start_date: contract?.execution_start_date || "",
        expected_execution_period: contract?.expected_execution_period || "",
        warranty_end_date: contract?.warranty_end_date || "",
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const getAwardedPercentageDrop = (bid_request_budget, awarding_budget) => {
        if (bid_request_budget && awarding_budget) {
            const awardedPercentage = (awarding_budget * 100) / bid_request_budget;
            const droppedPercentage = 100 - awardedPercentage;
            return droppedPercentage.toFixed(2);
        } else return null;
    };

    const handleFormSubmit = data => {
        const updatedContract = createContract({
            id: data.id,
            number: data.contract_number,
            comments: data.comments,
            services: FormUtil.getDataValue(data.services),
            financing_program: data.financing_program,
            bid_request_number: data.bid_request_number,
            bid_request_id: data.bid_request_id,
            bid_request_lot_number: data.bid_request_lot_number,
            bid_request_date: data.bid_request_date,
            total_amount_type: FormUtil.getDataValue(data.total_amount_type),
            product_frequency_type: FormUtil.getDataValue(data.product_frequency_type),
            payment_criteria_type: FormUtil.getDataValue(data.payment_criteria_type),
            bid_request_budget_min: FormUtil.getDataValue(data.bid_request_budget_min),
            bid_request_budget: FormUtil.getDataValue(data.bid_request_budget),
            awarding_budget_min: FormUtil.getDataValue(data.awarding_budget_min),
            awarding_budget: FormUtil.getDataValue(data.awarding_budget),
            awarding_percentage_drop: getAwardedPercentageDrop(
                data.bid_request_budget,
                data.awarding_budget
            ),
            awarding_date: data.awarding_date,
            awarding_professional_liability_insurance: FormUtil.getDataValue(
                data.awarding_professional_liability_insurance
            ),
            awarding_liability_insurance: FormUtil.getDataValue(
                data.awarding_liability_insurance
            ),
            awarding_accident_insurance: FormUtil.getDataValue(
                data.awarding_accident_insurance
            ),
            contractor: contract?.contractor,
            execution_signature_date: data.execution_signature_date,
            execution_start_date: data.execution_start_date,
            expected_execution_period: data.expected_execution_period,
            warranty_end_date: data.warranty_end_date,
            projects: contract ? contract.projects : [],
        });
        return onSubmit(updatedContract);
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <AlertError error={error} />
                <EntityForm
                    onSubmit={formMethods.handleSubmit(handleFormSubmit)}
                    onCancel={onCancel}
                >
                    {children}
                </EntityForm>
            </FormProvider>
        </DomainProvider>
    );
};

export default ContractForm;
