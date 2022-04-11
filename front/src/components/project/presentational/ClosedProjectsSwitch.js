import {useFormContext} from "react-hook-form";
import {FormSwitch} from "components/common/form";

const ClosedProjectsSwitch = () => {
    const {reset, getValues} = useFormContext();

    const handleChangeStatus = event => {
        const values = getValues();
        values["status"] = values["switchStatus"] === true ? "all" : "active";
        reset({
            ...values,
        });
    };

    return <FormSwitch name="switchStatus" onChangeHandler={handleChangeStatus} />;
};

export default ClosedProjectsSwitch;
