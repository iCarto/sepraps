import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {SectionCard} from "components/common/presentational";
import {useNavigate} from "react-router-dom";

import {ProjectLinkedLocalitiesTable} from ".";

const ProjectLinkedLocalitiesSection = ({
    isSidePanelOpen = null,
    linkedLocalities = null,
}) => {
    return (
        <SectionCard title="Localidades vinculadas" isSidePanelOpen={isSidePanelOpen}>
            <Grid item container xs={12} justifyContent="center">
                {linkedLocalities !== 0 ? (
                    <ProjectLinkedLocalitiesTable />
                ) : (
                    <Typography pt={3} pb={3} style={{fontStyle: "italic"}}>
                        Este proyecto aún no tiene localidades vinculadas
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}></Grid>
        </SectionCard>
    );
};

export default ProjectLinkedLocalitiesSection;
