import {useFormContext} from "react-hook-form";
import {NumberUtil} from "utilities";
import {
    FormInputDecimal,
    FormInputInteger,
    FormLocationSelect,
    FormSection,
} from "components/common/form";
import {MapForm} from "components/common/geo";
import ProjectFormLinkedLocalities from "./ProjectFormLinkedLocalities";

const ProjectFormLocationSection = () => {
    const {getValues, reset, control} = useFormContext();

    const handleSetLocation = (lat, lng) => {
        const values = getValues();
        values["main_infrastructure_latitude"] = NumberUtil.formatDecimal(lat, 5);
        values["main_infrastructure_longitude"] = NumberUtil.formatDecimal(lng, 5);
        reset({
            ...values,
        });
    };
    return (
        <FormSection title="Localización del sistema">
            <FormInputDecimal
                name="main_infrastructure_latitude"
                label="Latitud"
                disabled={true}
            />
            <FormInputDecimal
                name="main_infrastructure_longitude"
                label="Longitud"
                disabled={true}
            />
            <MapForm onClick={handleSetLocation} />
            <FormInputInteger name="main_infrastructure_altitude" label="Altitud" />
            <FormLocationSelect name="main_infrastructure_location" />

            <ProjectFormLinkedLocalities
                name="linked_localities"
                auxPropertyName="linked_locality"
            />
        </FormSection>
    );
};

export default ProjectFormLocationSection;
