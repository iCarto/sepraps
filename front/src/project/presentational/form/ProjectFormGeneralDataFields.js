import {useDomain} from "sepraps/domain/provider";
import {FormDatePicker, FormSelect, FormTextArea} from "base/form/components";

const ProjectFormGeneralDataFields = ({layout = "row"}) => {
    const {projectTypes, projectClasses} = useDomain();

    return (
        <>
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
            <FormTextArea
                name="description"
                label="Descripción del proyecto"
                rules={{required: "El campo es obligatorio"}}
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
