import {useFormContext, useWatch} from "react-hook-form";
import {NumberUtil} from "utilities";
import {FormInputDecimal, FormInputInteger} from "components/common/form";
import {MapForm} from "components/common/geo";

const ProjectFormLocationFields = ({isMapDisplayed = null}) => {
    const {control, getValues, reset} = useFormContext();

    const handleSetLocation = (lat, lng) => {
        const values = getValues();
        values["main_infrastructure_position"] = {
            latitude: NumberUtil.formatDecimal(lat, 5),
            longitude: NumberUtil.formatDecimal(lng, 5),
        };
        reset({
            ...values,
        });
    };

    const main_infrastructure_position = useWatch({
        control,
        name: "main_infrastructure_position",
    });

    return (
        <>
            <FormInputDecimal
                name="main_infrastructure_position.latitude"
                label="Latitud"
                rules={{required: "El campo es obligatorio"}}
            />
            <FormInputDecimal
                name="main_infrastructure_position.longitude"
                label="Longitud"
                rules={{required: "El campo es obligatorio"}}
            />
            {isMapDisplayed && (
                <MapForm
                    onClick={handleSetLocation}
                    latitude={NumberUtil.parseFloatOrNull(
                        main_infrastructure_position.latitude
                    )}
                    longitude={NumberUtil.parseFloatOrNull(
                        main_infrastructure_position.longitude
                    )}
                />
            )}
            <FormInputInteger name="main_infrastructure_altitude" label="Altitud" />
        </>
    );
};

export default ProjectFormLocationFields;
