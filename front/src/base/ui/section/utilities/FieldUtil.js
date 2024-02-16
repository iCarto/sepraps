import {SectionDomainField, SectionField} from "../components";

const FieldUtil = {
    getValue(value, unit) {
        if (value && unit) {
            return `${value} ${unit}`;
        } else if (value && !unit) {
            return `${value}`;
        } else return "—";
    },

    getSectionField(label, value, unit = "", tooltipText = null) {
        if (value) {
            return (
                <SectionField
                    key={label}
                    label={label}
                    value={value}
                    unit={unit}
                    tooltipText={tooltipText}
                />
            );
        } else
            return (
                <SectionField
                    key={label}
                    label={label}
                    value="Pendiente"
                    valueCustomStyle={{fontStyle: "italic"}}
                />
            );
    },

    getSectionDomainField(label, value, domain) {
        // Remember to include <DomainProvider> in some place of parents components tree
        return <SectionDomainField label={label} value={value} fieldDomain={domain} />;
    },
};

export default FieldUtil;
