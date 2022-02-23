import {useState} from "react";

import {ProjectSearchAutocomplete, ProjectSection} from ".";

import Grid from "@mui/material/Grid";

const ProjectFormSearch = ({onSelect}) => {
    const [existingProject, setExistingProject] = useState(null);

    const handleSelectExistingProject = project => {
        setExistingProject(project);
        onSelect(project);
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ProjectSearchAutocomplete handleSelect={handleSelectExistingProject} />
            </Grid>
            <Grid item xs={12}>
                {existingProject && <ProjectSection project={existingProject} />}
            </Grid>
        </Grid>
    );
};

export default ProjectFormSearch;
