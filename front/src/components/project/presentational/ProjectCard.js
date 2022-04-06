import {DateUtil} from "utilities";

import {ProjectTypeIcon} from "components/common/presentational";
import {MilestoneTimelineShort} from "components/milestone/presentational";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

const ProjectCard = ({project, onClick = null}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(project.id);
        }
    };
    console.log({project});

    return (
        <Card id={project.id} variant="outlined">
            <Stack
                justifyContent="space-between"
                onClick={handleClick}
                sx={{cursor: onClick ? "pointer" : "inherit"}}
            >
                <div style={{position: "relative"}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={project.featured_image}
                        alt={project.locality.locality_name}
                    />
                    <Box sx={projectTypeIconBoxStyle}>
                        <ProjectTypeIcon
                            projectType={project.project_type}
                            projectTypeName={project.project_type_name}
                            size="medium"
                        />
                    </Box>
                    <Tooltip title={`Clase: ${project.project_class}`}>
                        <Box sx={projectClassBoxStyle}>
                            <Typography variant="button">
                                {project.project_class_name}
                            </Typography>
                        </Box>
                    </Tooltip>
                </div>
                <CardContent>
                    <Typography variant="h5" color="primary">
                        {/* TODO Fix different accesor from project summary or project detail */}
                        {typeof project.locality === "object"
                            ? project.locality.locality_name
                            : project.locality_name}
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
                            <Typography variant="body2">
                                {typeof project.locality === "object"
                                    ? project.locality.district_name
                                    : project.district_name}{" "}
                                (
                                {typeof project.locality === "object"
                                    ? project.locality.department_name
                                    : project.department_name}
                                )
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Fecha de inicio">
                                <DateRangeOutlinedIcon fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2">
                                {DateUtil.formatDate(project.init_date)}
                            </Typography>
                        </Stack>
                        {project.construction_contract_number && (
                            <Stack direction="row" spacing={2}>
                                <Tooltip title="Contrato">
                                    <WorkOutlineOutlinedIcon fontSize="small" />
                                </Tooltip>
                                <Typography variant="body2">
                                    {project.construction_contract_number} (
                                    {project.construction_contract_bid_request_number})
                                </Typography>
                            </Stack>
                        )}
                        {project.financing_program_name && (
                            <Stack direction="row" spacing={2}>
                                <Tooltip title="Financiación">
                                    <AccountBalanceOutlinedIcon fontSize="small" />
                                </Tooltip>
                                <Typography variant="body2">
                                    {project.financing_program_name} (
                                    {project.financing_fund_name})
                                </Typography>
                            </Stack>
                        )}
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Trabajos">
                                <FactCheckOutlinedIcon fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2">{project.name}</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
};

export default ProjectCard;
