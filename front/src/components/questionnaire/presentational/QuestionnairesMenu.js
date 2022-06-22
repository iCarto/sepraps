import {MenuListItemLink, MenuListItemIcon} from "components/common/presentational";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

const QuestionnairesMenu = ({questionnaires, basePath}) => {
    return (
        <>
            <ListItem>
                <MenuListItemIcon>
                    <AssignmentOutlinedIcon />
                </MenuListItemIcon>
                <ListItemText
                    primary="Cuestionarios"
                    primaryTypographyProps={{color: "text.secondary"}}
                />
            </ListItem>
            <List component="div" disablePadding sx={{pl: 1}}>
                {questionnaires.map(questionnaire => (
                    <MenuListItemLink
                        key={questionnaire.code}
                        to={`${basePath}/questionnaires/${questionnaire.code}`}
                        icon={<ListAltOutlinedIcon />}
                        text={questionnaire.name}
                        textStyle={{fontSize: "0.9em"}}
                    />
                ))}
            </List>
        </>
    );
};

export default QuestionnairesMenu;
