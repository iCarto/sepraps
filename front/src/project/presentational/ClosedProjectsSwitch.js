import {useFormContext} from "react-hook-form";
import {FormSwitch} from "base/form/components";

const ClosedProjectsSwitch = ({onChangeHandler = null}) => {
    const {reset, getValues} = useFormContext();

    const handleChangeStatus = () => {
        const values = getValues();
        values["status"] = values["switchStatus"] ? "all" : "active";
        reset({
            ...values,
        });
        if (onChangeHandler) {
            onChangeHandler(values["status"]);
        }
    };

    return <FormSwitch name="switchStatus" onChangeHandler={handleChangeStatus} />;
};

export default ClosedProjectsSwitch;
