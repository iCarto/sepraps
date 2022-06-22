import {DateUtil} from "utilities";

import {ImagePreview} from "components/document/presentational";
import {MilestoneTimelineShort} from "components/milestone/presentational";
import {ProjectTypeIcon} from "components/common/presentational";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const projectTypeIconBoxStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    m: 1.5,
    mb: 2.5,
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
    mb: 2.5,
    px: 0.5,
    borderRadius: 1,
    bgcolor: "white",
    opacity: 0.8,
};

const closedProjectTagStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: {xs: "none", md: "flex"},
    m: 1.5,
    px: 0.5,
    borderRadius: "5%",
    bgcolor: "error.main",
    opacity: 0.8,
};

const ProjectCard = ({project, onClick = null}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(project.id);
        }
    };

    return (
        <Card id={project.id}>
            <Stack
                justifyContent="space-between"
                onClick={handleClick}
                sx={{cursor: onClick ? "pointer" : "inherit"}}
            >
                <div style={{position: "relative"}}>
                    <ImagePreview
                        path={project.featured_image}
                        alt={project.name}
                        sx={project.closed === true ? {opacity: 0.4} : {opacity: 1}}
                    />
                    <Box sx={projectTypeIconBoxStyle}>
                        <ProjectTypeIcon
                            projectType={project.project_type}
                            projectTypeName={project.project_type_name}
                            size="medium"
                        />
                    </Box>
                    {project.closed && (
                        <Box sx={closedProjectTagStyle}>
                            <Typography
                                component="span"
                                variant="button"
                                sx={{fontWeight: 800, color: "#fff"}}
                            >
                                Archivado
                            </Typography>
                        </Box>
                    )}
                    <Tooltip title={`Clase: ${project.project_class_name}`}>
                        <Box sx={projectClassBoxStyle}>
                            <Typography variant="button">
                                {project.project_class_name}
                            </Typography>
                        </Box>
                    </Tooltip>
                </div>
                <CardContent>
                    <Typography variant="h5" color="primary">
                        {project.name}
                    </Typography>
                    <Typography variant="body1">{project.code}</Typography>
                    <Box sx={{mt: 2}}>
                        <MilestoneTimelineShort milestones={project.milestones} />
                    </Box>
                </CardContent>
                <CardContent sx={{bgcolor: "grey.100"}}>
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Ubicación">
                                <LocationOnOutlinedIcon fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2">{project.location}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Fecha de inicio">
                                <DateRangeOutlinedIcon fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2">
                                {DateUtil.formatDate(project.init_date)}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Contrato">
                                <WorkOutlineOutlinedIcon fontSize="small" />
                            </Tooltip>
                            {project.construction_contract_number && (
                                <Typography variant="body2">
                                    {project.construction_contract_number} (
                                    {project.construction_contract_bid_request_number})
                                </Typography>
                            )}
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Financiación">
                                <AccountBalanceOutlinedIcon fontSize="small" />
                            </Tooltip>
                            {project.financing_program_name && (
                                <Typography variant="body2">
                                    {project.financing_program_name}
                                </Typography>
                            )}
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Trabajos">
                                <FactCheckOutlinedIcon fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2">
                                {project.description}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
};

export default ProjectCard;
