import {FormInputInteger, FormMapCoordinates} from "base/form/components";

const ProjectFormLocationFields = ({orientation = "row"}) => {
    return (
        <>
            <FormMapCoordinates
                name="main_infrastructure_position"
                orientation={orientation}
                required
            />
            <FormInputInteger
                name="main_infrastructure_position.altitude"
                label="Altitud"
            />
        </>
    );
};

export default ProjectFormLocationFields;
