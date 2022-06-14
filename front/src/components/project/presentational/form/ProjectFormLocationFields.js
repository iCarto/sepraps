import {FormInputInteger, FormMapCoordinates} from "components/common/form";

const ProjectFormLocationFields = ({orientation = "vertical"}) => {
    return (
        <>
            <FormMapCoordinates
                name="main_infrastructure_position"
                orientation={orientation}
            />
            <FormInputInteger
                name="main_infrastructure_position.altitude"
                label="Altitud"
            />
        </>
    );
};

export default ProjectFormLocationFields;
