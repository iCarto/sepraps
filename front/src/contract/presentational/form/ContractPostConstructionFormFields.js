import {FormDatePicker} from "base/form/components";

const ContractPostConstructionFormFields = () => {
    return (
        <>
            <FormDatePicker
                name="warranty_end_date"
                label="Fin del plazo de garantía"
            />
        </>
    );
};

export default ContractPostConstructionFormFields;
