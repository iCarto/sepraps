import {SectionField} from ".";
import {useDomain} from "sepraps/domain/provider";

const SectionDomainField = ({label = null, value = null, fieldDomain = ""}) => {
    const domains = useDomain();

    const verboseValue = domains[fieldDomain]?.find(item => item.value === value)
        ?.label;
    const fieldValue = verboseValue || <em>Pendiente</em>;

    return <SectionField key={label} label={label} value={fieldValue} />;
};

export default SectionDomainField;
