import {SectionField} from "../components";

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
            return (
                <SectionField key={label} label={label} value={`${value} ${unit}`} />
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
};

export default FieldUtil;
