import {Fragment, useState} from "react";
import {useFormContext} from "react-hook-form";

import {useDomain} from "components/common/provider";
import {FormSelect} from "components/common/form";

const FormFinancingSelect = ({name: propsName}) => {
    const {reset, getValues} = useFormContext();
    const {financingFunds, financingPrograms} = useDomain();

    const [financingFundPrograms, setFinancingFundsPrograms] = useState(() => {
        const values = getValues();
        if (values[propsName].financing_fund !== "") {
            return financingPrograms.filter(
                district => district.financing_fund === values[propsName].financing_fund
            );
        }
        return [];
    });

    const onChangeFinancingFund = selectedFinancingFund => {
        console.log("selectedFinancingFund", {selectedFinancingFund});
        const financingFundPrograms = financingPrograms.filter(
            financingProgram =>
                financingProgram.financing_fund === selectedFinancingFund
        );
        const values = getValues();
        values[propsName] = {
            financing_fund: selectedFinancingFund,
            financing_program: "",
        };
        reset({
            ...values,
        });
        setFinancingFundsPrograms(financingFundPrograms);
    };

    return (
        <Fragment>
            <FormSelect
                name={`${propsName}.financing_fund`}
                label="Fondo de financiación"
                options={financingFunds}
                onChangeHandler={onChangeFinancingFund}
            />
            <FormSelect
                name={`${propsName}.financing_program`}
                label="Programa de financiación"
                options={financingFundPrograms}
            />
        </Fragment>
    );
};

export default FormFinancingSelect;
