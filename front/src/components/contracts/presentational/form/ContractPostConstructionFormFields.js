import {FormDatePicker} from "components/common/form";

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
