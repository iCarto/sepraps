import {DateUtil} from "utilities";
import {useNavigate} from "react-router-dom";
import {ActionsMenu, Icon, MenuAction, ProgressBar} from "../../common/presentational";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Tooltip from "@mui/material/Tooltip";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const bull = (
    <Box
        component="span"
        sx={{display: "inline-block", mx: "2px", transform: "scale(0.8)"}}
    >
        •
    </Box>
);

var handleActions = true;

const ProjectCard = ({project}) => {
    const navigate = useNavigate();

    const handleClick = (projectId, buttonName) => {
        const action = buttonName.split("-")[0];

        action === "add" && navigate("/projects/new");

        console.log(projectId, buttonName);
    };

    console.log(project);
    return (
        <Grid item component="li" xs={12} sm={6} md={4} xl={3}>
            <Card id={project.id}>
                <Link href={`/projects/${project.id}`} underline="none" color="inherit">
                    <div style={{position: "relative"}}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={project.featured_image}
                            alt={project.name}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                m: 1.5,
                                p: 0.75,
                                borderRadius: "50%",
                                bgcolor: "white",
                                opacity: 0.8,
                            }}
                        >
                            <Icon icon={project.project_type} size="medium" />
                        </Box>
                        <Tooltip title={`Clase: ${project.project_class}`}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    display: "flex",
                                    m: 1.5,
                                    px: 0.5,
                                    bgcolor: "white",
                                    opacity: 0.8,
                                    borderRadius: 1,
                                }}
                            >
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
                </Link>
            </Card>
        </Grid>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectCard;
