import {ProjectFormGeneralDataFields, ProjectFormLocationFields} from ".";

const ProjectModificationForm = ({section}) => {
    if (section === "generaldata") {
        return <ProjectFormGeneralDataFields layout="column" />;
    }
    if (section === "main_infrastructure") {
        return <ProjectFormLocationFields />;
    }
    return null;
};

export default ProjectModificationForm;
