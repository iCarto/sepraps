import {useState} from "react";

import {ProjectSearchAutocomplete, ProjectSection} from ".";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProjectFormSearch = ({onSelect, onCancel}) => {
    const [existingProject, setExistingProject] = useState(null);

    const handleSelectExistingProject = project => {
        setExistingProject(project);
    };

    return (
        <Grid container spacing={2} sx={{mt: 0.25}}>
            <Grid item xs={12}>
                <ProjectSearchAutocomplete handleSelect={handleSelectExistingProject} />
            </Grid>
            <Grid item xs={12}>
                {existingProject && <ProjectSection project={existingProject} />}
            </Grid>
            <Grid container justifyContent="center" sx={{mt: 2}}>
                <Grid>
                    <Button color="inherit" onClick={onCancel}>
                        Cerrar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ml: 2}}
                        onClick={() => {
                            onSelect(existingProject);
                        }}
                    >
                        Añadir
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectFormSearch;
