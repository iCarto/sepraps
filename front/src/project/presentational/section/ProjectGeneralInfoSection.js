import Grid from "@mui/material/Grid";

import {SectionField} from "base/ui/section/components";
import {DateUtil} from "base/format/utilities";
import {ProjectTypeClassChips} from "..";

const ProjectGeneralInfoSection = ({project}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionField label="Nombre" value={project.name} />
                <SectionField label="Descripción" value={project.description} />
                <SectionField
                    label="Trabajos"
                    value={
                        <ProjectTypeClassChips projectWorks={project?.project_works} />
                    }
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionField label="Código" value={project.code} />
                <SectionField
                    label="Fecha de inicio"
                    value={DateUtil.formatDate(project.init_date)}
                />
            </Grid>
        </Grid>
    );
};

export default ProjectGeneralInfoSection;
