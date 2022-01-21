import {useDomain} from "components/common/provider";
import {
    FormInputText,
    FormDatePicker,
    FormSelect,
    FormSection,
} from "components/common/form";

const ProjectFormGeneralDataSection = () => {
    const {projectTypes, projectClasses} = useDomain();

    return (
        <FormSection title="Información general del proyecto">
            <FormInputText
                name="name"
                label="Nombre del proyecto"
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
        </FormSection>
    );
};

export default ProjectFormGeneralDataSection;
