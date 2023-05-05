import {useState} from "react";

import {ProjectSearchAutocomplete} from "project/presentational/form";
import {ProjectSection} from "project/presentational/section";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProjectFormSearch = ({
    onClickSelected = null,
    onSubmit = null,
    onCancel = null,
}) => {
    const [existingProject, setExistingProject] = useState(null);

    const handleSelectExistingProject = project => {
        if (onClickSelected) {
            onClickSelected(project);
        }
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
                    {onCancel && (
                        <Button color="inherit" onClick={onCancel}>
                            Cancelar
                        </Button>
                    )}
                    {onSubmit && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 3}}
                            onClick={() => {
                                onSubmit(existingProject);
                            }}
                        >
                            Guardar
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectFormSearch;
