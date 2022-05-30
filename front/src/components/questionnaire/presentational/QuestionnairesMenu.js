import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import {MenuListItemLink, MenuListItemIcon} from "components/common/presentational";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";

const ProjectMenuQuestionnaires = ({questionnaires, basePath}) => {
    return (
        <>
            <ListItem>
                <MenuListItemIcon>
                    <AssignmentOutlinedIcon />
                </MenuListItemIcon>
                <ListItemText primary="Seguimiento" />
            </ListItem>
            <List component="div" disablePadding sx={{pl: 1}}>
                {questionnaires.map(questionnaire => (
                    <MenuListItemLink
                        key={questionnaire.code}
                        to={`${basePath}/questionnaires/${questionnaire.code}`}
                    >
                        <MenuListItemIcon>
                            <BallotOutlinedIcon fontSize="small" />
                        </MenuListItemIcon>
                        <ListItemText
                            primary={questionnaire.name}
                            primaryTypographyProps={{
                                fontSize: "0.9em",
                            }}
                        />
                    </MenuListItemLink>
                ))}
            </List>
        </>
    );
};

export default ProjectMenuQuestionnaires;
