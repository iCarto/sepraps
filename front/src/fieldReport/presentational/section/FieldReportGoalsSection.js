import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";

import {AddNewButton} from "base/shared/components";
import {
    SectionActionsMenu,
    SectionCard,
    SectionCardHeaderAction,
} from "base/ui/section/components";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";
import {FieldReportService} from "fieldReport/service";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleIcon from "@mui/icons-material/Circle";

const FieldReportGoalsSection = ({fieldReport}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const handleClickDelete = index => {
        console.log("delete", index);
    };

    const {dialog: deleteDialog} = useMenuGenericDeleteAction(FieldReportService);

    const getSecondaryActions = index => {
        return [
            <SectionCardHeaderAction
                key="edit"
                name="edit"
                text="Modificar"
                icon={<EditIcon />}
                onClick={() => {
                    navigate(`goals/edit/${index}`);
                }}
                roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
            />,
            <SectionCardHeaderAction
                key="delete"
                name="delete"
                text="Eliminar"
                icon={<DeleteIcon color="error" />}
                onClick={() => handleClickDelete(index)}
                roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
            />,
        ];
    };

    const listItemStyle = {
        pt: 0,
        px: 1,
        "& .MuiListItemText-root": {
            maxWidth: "90%",
        },
    };

    return (
        <>
            {deleteDialog}
            <SectionCard title="Objetivos">
                {fieldReport.visit_goals.length ? (
                    <List dense>
                        {fieldReport.visit_goals.map((goal, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    sx={listItemStyle}
                                    secondaryAction={
                                        <SectionActionsMenu>
                                            {getSecondaryActions(index)}
                                        </SectionActionsMenu>
                                    }
                                >
                                    <ListItemIcon sx={{minWidth: "36px"}}>
                                        <CircleIcon sx={{fontSize: "8px"}} />
                                    </ListItemIcon>
                                    <ListItemText primary={goal.text} />
                                </ListItem>
                            );
                        })}
                    </List>
                ) : (
                    <Stack alignItems="center" spacing={3}>
                        <Typography sx={{fontStyle: "italic"}}>
                            No se ha definido ningún objetivo para este informe.
                        </Typography>
                    </Stack>
                )}
                <Stack alignItems="center" mt={2}>
                    <AddNewButton text="Añadir objetivo" basePath="goals/add/new" />
                </Stack>
            </SectionCard>
        </>
    );
};

export default FieldReportGoalsSection;
