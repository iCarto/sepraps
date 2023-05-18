import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const MilestoneSection = ({milestone}) => {
    const isMilestoneCompleted = milestone?.compliance_date;

    const ViewOnlyChecklist = () => {
        return (
            <List>
                {milestone?.checklist?.map((checklistItem, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemIcon
                            sx={{justifyContent: "center", minWidth: 0, pl: 1, pr: 1.5}}
                        >
                            {isMilestoneCompleted ? (
                                <DoneIcon fontSize="small" />
                            ) : (
                                <ArrowRightIcon fontSize="small" />
                            )}
                        </ListItemIcon>
                        <ListItemText primary={checklistItem["definition"]} />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        milestone && (
            <SectionCard title={milestone.short_name}>
                <SectionField
                    label="Fecha de cumplimiento"
                    value={
                        isMilestoneCompleted
                            ? DateUtil.formatDate(milestone.compliance_date)
                            : "Pendiente"
                    }
                    containerWidth="short"
                />
                {milestone.comments && (
                    <SectionField
                        label="Observaciones:"
                        value={milestone.comments}
                        containerWidth="short"
                    />
                )}
                {isMilestoneCompleted && (
                    <>
                        <Divider variant="middle" sx={{mx: 0, my: 2}}>
                            <Chip
                                label="Tareas completadas"
                                sx={{fontWeight: "light"}}
                            />
                        </Divider>
                        <ViewOnlyChecklist />
                    </>
                )}
            </SectionCard>
        )
    );
};

export default MilestoneSection;
