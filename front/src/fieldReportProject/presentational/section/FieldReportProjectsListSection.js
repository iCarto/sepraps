import {Fragment} from "react";
import {useParams} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {TextLink} from "base/navigation/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const FieldReportProjectsListSection = ({fieldReportProjects}) => {
    const {id: reportId} = useParams();

    const contracts = new Set();
    fieldReportProjects.map(fieldReportProject =>
        contracts.add(fieldReportProject.construction_contract_number)
    );

    const listItemStyle = {
        pt: 0,
        px: 1,
        "& .MuiListItemText-root": {
            maxWidth: "90%",
        },
    };

    const ProjectsList = ({contract}) => {
        return (
            <List component="div" dense>
                {fieldReportProjects.map((fieldReportProject, projectIndex) => {
                    if (fieldReportProject.construction_contract_number === contract)
                        return (
                            <ListItem key={projectIndex} sx={listItemStyle}>
                                <ListItemIcon
                                    sx={{
                                        ml: 4,
                                        minWidth: "24px",
                                    }}
                                >
                                    <RadioButtonUncheckedIcon
                                        sx={{
                                            fontSize: "8px",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <TextLink
                                            text={`Proyecto ${fieldReportProject.code}, ${fieldReportProject.name}`}
                                            to={`/field-reports/${reportId}/projects/${fieldReportProject.id}`}
                                        />
                                    }
                                />
                            </ListItem>
                        );
                })}
            </List>
        );
    };

    return (
        <>
            <SectionCard title="Contratos y proyectos objetivo del informe">
                {fieldReportProjects ? (
                    <List dense sx={{paddingTop: 0}}>
                        {[...contracts].map((contract, contractIndex) => {
                            return (
                                <Fragment key={contractIndex}>
                                    <ListItem sx={listItemStyle}>
                                        <ListItemIcon sx={{minWidth: "36px"}}>
                                            <CircleIcon sx={{fontSize: "8px"}} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography sx={{fontWeight: "500"}}>
                                                    Contrato {contract}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    {<ProjectsList contract={contract} />}
                                </Fragment>
                            );
                        })}
                    </List>
                ) : (
                    <Stack alignItems="center" spacing={3}>
                        <Typography sx={{fontStyle: "italic"}}>
                            No se ha definido ningún proyecto para este informe.
                        </Typography>
                    </Stack>
                )}
            </SectionCard>
        </>
    );
};

export default FieldReportProjectsListSection;
