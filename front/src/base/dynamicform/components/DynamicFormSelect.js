import {useDomain} from "sepraps/domain/provider";
import {FormSelect} from "base/form/components";

const DynamicFormSelect = ({key, name, label, fieldDomain}) => {
    const domains = useDomain();

    return (
        <FormSelect
            key={key}
            name={name}
            label={label}
            options={domains[fieldDomain]}
        />
    );
};

export default DynamicFormSelect;
