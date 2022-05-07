import {useEffect, useState} from "react";
import {FinancingService} from "service/api";
import {FormAutocomplete} from "components/common/form";

const FormFinancingProgramAutocomplete = ({name, label, rules = {}}) => {
    const [financingPrograms, setFinancingPrograms] = useState([]);

    useEffect(() => {
        FinancingService.getFinancingPrograms().then(financingPrograms => {
            setFinancingPrograms(financingPrograms);
        });
    }, []);

    return (
        <FormAutocomplete
            name={name}
            label={label}
            options={financingPrograms}
            rules={rules}
        />
    );
};

export default FormFinancingProgramAutocomplete;
