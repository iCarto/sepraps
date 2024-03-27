import {DateUtil, NumberUtil} from "base/format/utilities";
import {ClosedProjectTag, ProjectTypeClassChips} from "project/presentational";
import {ProgressBarSmall} from "base/progress/components";
import {ImagePreview} from "base/image/components";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

//TODO: avoid duplicated constant.
const NO_BCM_DATA_MESSAGE = "No hay datos suficientes para mostrar el avance";

const iconsContainerStyle = {
    position: "absolute",
    top: 5,
    left: 5,
};

const ProjectCard = ({entity: project, onClick = null}) => {
    const CardField = ({label, icon, value, badgeNote = null}) => (
        <Stack direction="row" spacing={1}>
            {badgeNote ? (
                <Tooltip title={label + (badgeNote && ` (${badgeNote})`)}>
                    <Badge color="warning" variant="dot">
                        {icon}
                    </Badge>
                </Tooltip>
            ) : (
                <Tooltip title={label}>{icon}</Tooltip>
            )}
            <Typography variant="body2">{value}</Typography>
        </Stack>
    );

    return (
        <Card
            id={project.id}
            onClick={() => {
                onClick(project.id);
            }}
            sx={{cursor: onClick ? "pointer" : "inherit"}}
        >
            <div style={{position: "relative"}}>
                <ImagePreview
                    path={project.featured_image}
                    alt={project.name}
                    width="auto"
                    height="170px"
                    sx={{opacity: project.closed ? 0.4 : 1}}
                />
                {project.closed && (
                    <ClosedProjectTag
                        tagCustomStyle={{
                            display: {xs: "none", md: "flex"},
                            position: "absolute",
                            top: 0,
                            right: 0,
                            m: 1.5,
                        }}
                    />
                )}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        m: 1,
                    }}
                >
                    <ProjectTypeClassChips projectWorks={project?.project_works} />
                </Box>
            </div>
            <CardContent sx={{pb: 1}}>
                <Typography variant="h5" color="primary">
                    {project.name}
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    sx={{my: 0.5}}
                >
                    <Typography variant="body1">{project.code}</Typography>
                    <Stack direction="row" justifyContent="center" spacing={2}>
                        {project.number_of_participants && (
                            <Tooltip
                                title={`${project.number_of_participants} personas capacitadas (${project.percentage_of_women}% de mujeres)`}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={0.5}
                                >
                                    <SchoolOutlinedIcon
                                        sx={{color: "grey.500", fontSize: 18}}
                                    />
                                    <Typography
                                        sx={{color: "grey.500", fontSize: "0.8rem"}}
                                    >
                                        {project.number_of_participants}
                                    </Typography>
                                </Stack>
                            </Tooltip>
                        )}
                        {project.number_of_planned_connections && (
                            <Tooltip
                                title={`${project.number_of_actual_connections} de ${project.number_of_planned_connections} conexiones ejecutadas (${project.percentage_of_connections}%)`}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    spacing={0.5}
                                >
                                    <HouseOutlinedIcon
                                        sx={{color: "grey.500", fontSize: 18}}
                                    />
                                    <Typography
                                        sx={{color: "grey.500", fontSize: "0.8rem"}}
                                    >
                                        {project.number_of_actual_connections || 0}/
                                        {project.number_of_planned_connections}
                                    </Typography>
                                </Stack>
                            </Tooltip>
                        )}
                    </Stack>
                </Stack>
                <Stack>
                    <ProgressBarSmall
                        progressValue={NumberUtil.formatDecimalWithoutZeros(
                            project.financial_progress_percentage
                        )}
                        tooltipLabel={
                            project.financial_progress_percentage
                                ? `Avance financiero: ${NumberUtil.formatDecimalWithoutZeros(
                                      project.financial_progress_percentage
                                  )}%`
                                : NO_BCM_DATA_MESSAGE
                        }
                        progressStyle={{mb: 1}}
                    />
                    <ProgressBarSmall
                        progressValue={NumberUtil.formatDecimalWithoutZeros(
                            project.physical_progress_percentage
                        )}
                        tooltipLabel={
                            project.physical_progress_percentage
                                ? `Avance físico: ${NumberUtil.formatDecimalWithoutZeros(
                                      project.physical_progress_percentage
                                  )}%`
                                : NO_BCM_DATA_MESSAGE
                        }
                    />
                </Stack>
            </CardContent>
            <CardContent sx={{bgcolor: "grey.100"}}>
                <Stack spacing={1}>
                    <Typography variant="body2">{project.description}</Typography>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <CardField
                                    label="Contrato"
                                    icon={<WorkOutlineOutlinedIcon fontSize="small" />}
                                    value={
                                        project.construction_contract_number ||
                                        project.construction_contract
                                            ?.bid_request_number
                                    }
                                />
                                <CardField
                                    label="Programa de financiación"
                                    icon={
                                        <AccountBalanceOutlinedIcon fontSize="small" />
                                    }
                                    value={
                                        project.financing_program_name ||
                                        project.construction_contract?.financing_program
                                            ?.short_name
                                    }
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <CardField
                                    label="Fecha de inicio"
                                    icon={<DateRangeOutlinedIcon fontSize="small" />}
                                    value={DateUtil.formatDate(project.init_date)}
                                />
                                <CardField
                                    label="Ubicación"
                                    icon={<LocationOnOutlinedIcon fontSize="small" />}
                                    value={project.location}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
