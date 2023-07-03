import {FormSelect} from "base/form/components";

const FormProjectSelect = ({name, projects, required = false}) => {
    return (
        <FormSelect
            name={`${name}`}
            label="Proyecto"
            rules={required ? {required: "Este campo es obligatorio"} : null}
            options={projects}
            showEmptyOption={true}
        />
    );
};

export default FormProjectSelect;
