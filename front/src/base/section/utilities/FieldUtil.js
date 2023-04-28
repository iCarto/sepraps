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
            return <SectionField label={label} value={`${value} ${unit}`} />;
        } else
            return (
                <SectionField label={label} value="Pendiente" valueFontStyle="italic" />
            );
    },
};

export default FieldUtil;
