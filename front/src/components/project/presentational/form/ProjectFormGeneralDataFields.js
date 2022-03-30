import {useDomain} from "components/common/provider";
import {FormInputText, FormDatePicker, FormSelect} from "components/common/form";

const ProjectFormGeneralDataFields = () => {
    const {projectTypes, projectClasses} = useDomain();

    return (
        <>
            <FormInputText
                name="name"
                label="Descripción del proyecto"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormSelect
                name="project_type"
                label="Tipo de proyecto"
                rules={{required: "El campo es obligatorio"}}
                options={projectTypes}
            />
            <FormSelect
                name="project_class"
                label="Clase de proyecto"
                rules={{required: "El campo es obligatorio"}}
                options={projectClasses}
            />
            <FormDatePicker
                name="init_date"
                label="Fecha de inicio"
                rules={{required: "El campo es obligatorio"}}
            />
        </>
    );
};

export default ProjectFormGeneralDataFields;
