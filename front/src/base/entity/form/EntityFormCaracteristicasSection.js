import {FormSection} from "base/form/components";

const EntityFormCaracteristicasSection = ({title = "Características", fields}) => {
    return (
        <>
            <FormSection title={title}>{fields}</FormSection>
        </>
    );
};

export default EntityFormCaracteristicasSection;
