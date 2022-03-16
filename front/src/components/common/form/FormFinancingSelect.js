import {Fragment, useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";

import {useDomain} from "components/common/provider";
import {FormSelect} from "components/common/form";

const FormFinancingSelect = ({name: propsName}) => {
    const {reset, getValues} = useFormContext();
    const {financingFunds, financingPrograms} = useDomain();
    const [financingFundsPrograms, setFinancingFundsPrograms] = useState([]);

    useEffect(() => {
        const values = getValues();
        if (values[propsName]?.financing_fund !== "") {
            setFinancingFundsPrograms(
                financingPrograms.filter(
                    financingProgram =>
                        financingProgram.financing_fund ===
                        values[propsName].financing_fund
                )
            );
        }
    }, [financingPrograms]);

    const onChangeFinancingFund = selectedFinancingFund => {
        setFinancingFundsPrograms(
            financingPrograms.filter(
                financingProgram =>
                    financingProgram.financing_fund === selectedFinancingFund
            )
        );
        const values = getValues();
        values[propsName] = {
            financing_fund: selectedFinancingFund,
            financing_program: "",
        };
        reset({
            ...values,
        });
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
                options={financingFundsPrograms}
            />
        </Fragment>
    );
};

export default FormFinancingSelect;
