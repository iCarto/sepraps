import {DateUtil} from "utilities";
import {SectionCard, SectionField} from "components/common/presentational";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";

const MilestoneSection = ({milestone}) => {
    const DoneChecklist = () => {
        return (
            <List>
                {milestone?.checklist?.map((checklistItem, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemIcon
                            sx={{justifyContent: "center", minWidth: 0, pl: 1, pr: 1.5}}
                        >
                            <DoneIcon fontSize="small" />
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
                    label="Fecha de cumplimiento:"
                    value={DateUtil.formatDate(milestone.compliance_date)}
                    containerWidth="short"
                />
                <Divider variant="middle" sx={{mx: 0, my: 2}}>
                    <Chip label="Tareas completadas" sx={{fontWeight: "light"}} />
                </Divider>
                <DoneChecklist />
            </SectionCard>
        )
    );
};

export default MilestoneSection;
