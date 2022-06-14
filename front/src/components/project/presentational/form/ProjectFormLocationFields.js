import {FormInputInteger, FormMapCoordinates} from "components/common/form";

const ProjectFormLocationFields = () => {
    return (
        <>
            <FormMapCoordinates name="main_infrastructure_position" />
            <FormInputInteger
                name="main_infrastructure_position.altitude"
                label="Altitud"
            />
        </>
    );
};

export default ProjectFormLocationFields;
