import {useFormContext} from "react-hook-form";
import {NumberUtil} from "utilities";
import {
    FormInputDecimal,
    FormInputInteger,
    FormLocationSelect,
} from "components/common/form";
import {MapForm} from "components/common/geo";

const ProjectFormLocationFields = ({isMapDisplayed = null}) => {
    const {getValues, reset} = useFormContext();

    const handleSetLocation = (lat, lng) => {
        const values = getValues();
        values["main_infrastructure_latitude"] = NumberUtil.formatDecimal(lat, 5);
        values["main_infrastructure_longitude"] = NumberUtil.formatDecimal(lng, 5);
        reset({
            ...values,
        });
    };
    return (
        <>
            <FormInputDecimal
                name="main_infrastructure_latitude"
                label="Latitud"
                disabled={isMapDisplayed}
            />
            <FormInputDecimal
                name="main_infrastructure_longitude"
                label="Longitud"
                disabled={isMapDisplayed}
            />
            {isMapDisplayed && <MapForm onClick={handleSetLocation} />}
            <FormInputInteger name="main_infrastructure_altitude" label="Altitud" />
        </>
    );
};

export default ProjectFormLocationFields;
