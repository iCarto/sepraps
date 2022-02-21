import {DateUtil} from "utilities";

import {Icon, ProgressBar} from "../../common/presentational";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";

const bull = (
    <Box
        component="span"
        sx={{display: "inline-block", mx: "2px", transform: "scale(0.8)"}}
    >
        •
    </Box>
);

const projectTypeIconBoxStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    m: 1.5,
    p: 0.75,
    borderRadius: "50%",
    bgcolor: "white",
    opacity: 0.8,
};

const projectClassBoxStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    display: "flex",
    m: 1.5,
    px: 0.5,
    borderRadius: 1,
    bgcolor: "white",
    opacity: 0.8,
};

const ProjectCard = ({project, onClick}) => {
    const handleClick = () => {
        onClick(project.id);
    };

    return (
        <Grid item component="li" xs={12} sm={6} md={4} xl={3}>
            <Card id={project.id}>
                <Box onClick={handleClick} sx={{cursor: "pointer"}}>
                    <div style={{position: "relative"}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={project.featured_image}
                            alt={project.name}
                        />
                        <Box sx={projectTypeIconBoxStyle}>
                            <Icon icon={project.project_type} size="medium" />
                        </Box>
                        <Tooltip title={`Clase: ${project.project_class}`}>
                            <Box sx={projectClassBoxStyle}>
                                <Typography variant="button">
                                    {project.project_class}
                                </Typography>
                            </Box>
                        </Tooltip>
                    </div>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {project.name}
                            <Typography variant="body2">{project.code}</Typography>
                        </Typography>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="subtitle2" sx={{lineHeight: "normal"}}>
                                {project.financing_program_name} {bull}{" "}
                                {project.financing_fund_name}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardContent sx={{bgcolor: "grey.200"}}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1.75,
                            }}
                        >
                            <Tooltip title="Ubicación">
                                <LocationOnIcon fontSize="small" sx={{mr: 1}} />
                            </Tooltip>
                            <Typography variant="subtitle1" sx={{lineHeight: "normal"}}>
                                {project.locality.locality_name},{" "}
                                {project.locality.district_name} (
                                {project.locality.department_name})
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Tooltip title="Fecha de inicio">
                                <DateRangeIcon fontSize="small" sx={{mr: 1}} />
                            </Tooltip>
                            <Typography variant="subtitle1" sx={{lineHeight: 1}}>
                                {DateUtil.formatDateMonth(project.init_date)}
                            </Typography>
                        </Box>
                        <ProgressBar barPhase={project.phase_name} />
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    );
};

export default ProjectCard;
