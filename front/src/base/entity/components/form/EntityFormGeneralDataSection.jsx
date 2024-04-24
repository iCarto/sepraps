import {FormSection} from "base/form/components";

const EntityFormGeneralDataSection = ({fields = null}) => {
    return (
        <>
            {fields ? (
                <FormSection title="Información general">{fields}</FormSection>
            ) : null}
            <FormSection title="Ubicación">
                {/* <EntityFormLocationFields rules={{required: "O campo é obrigatorio"}} /> */}
            </FormSection>
        </>
    );
};

export default EntityFormGeneralDataSection;
