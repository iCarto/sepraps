import {DateUtil} from "utilities";

import {Icon} from "../../common/presentational";
import {MilestoneTimelineShort} from "components/milestone/presentational";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PaidIcon from "@mui/icons-material/Paid";
import DateRangeIcon from "@mui/icons-material/DateRange";

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
        <Card id={project.id} variant="outlined">
            <Box onClick={handleClick} sx={{cursor: "pointer"}}>
                <div style={{position: "relative"}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={project.featured_image}
                        alt={project.locality.locality_name}
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
                    <Typography variant="h5" color="primary">
                        {project.locality.locality_name}
                    </Typography>
                    <Typography
                        variant="h6"
                        gutterBottom
                        color="primary"
                        sx={{textTransform: "uppercase", lineHeight: 1}}
                    >
                        {project.locality.district_name} (
                        {project.locality.department_name})
                    </Typography>
                    <Typography variant="body2">{project.code}</Typography>
                    <Typography variant="subtitle2" sx={{lineHeight: "normal"}}>
                        {project.name}
                    </Typography>
                    <Box sx={{mt: 2}}>
                        <MilestoneTimelineShort milestones={project.milestones} />
                    </Box>
                </CardContent>
                <CardContent sx={{bgcolor: "grey.200"}}>
                    {project.financing_fund_name && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1.75,
                            }}
                        >
                            <Tooltip title="Financiación">
                                <PaidIcon fontSize="small" sx={{mr: 1}} />
                            </Tooltip>
                            <div>
                                <Typography
                                    variant="subtitle1"
                                    sx={{lineHeight: "normal"}}
                                >
                                    {project.financing_program_name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{lineHeight: "normal"}}
                                >
                                    {project.financing_fund_name}
                                </Typography>
                            </div>
                        </Box>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip title="Fecha de inicio">
                            <DateRangeIcon fontSize="small" sx={{mr: 1}} />
                        </Tooltip>
                        <Typography variant="subtitle1" sx={{lineHeight: 1}}>
                            {DateUtil.formatDateMonth(project.init_date)}
                        </Typography>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default ProjectCard;
