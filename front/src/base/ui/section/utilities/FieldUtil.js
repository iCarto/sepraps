import {DomainProvider} from "sepraps/domain/provider";
import {SectionDomainField, SectionField} from "../components";

const FieldUtil = {
    getValue(value, unit) {
        if (value && unit) {
            return `${value} ${unit}`;
        } else if (value && !unit) {
            return `${value}`;
        } else return "—";
    },

    getSectionField(label, value, unit = "") {
        if (value) {
            return <SectionField key={label} label={label} value={value} unit={unit} />;
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
        return (
            <DomainProvider>
                <SectionDomainField label={label} value={value} fieldDomain={domain} />
            </DomainProvider>
        );
    },
};

export default FieldUtil;
