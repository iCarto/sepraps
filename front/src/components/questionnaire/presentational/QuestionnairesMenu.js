import {useState} from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MenuListItemLink from "components/common/presentational/MenuListItemLink";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";

const ProjectMenuQuestionnaires = ({questionnaires, basePath}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AssignmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Seguimiento" />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {questionnaires.map(questionnaire => (
                        <MenuListItemLink
                            key={questionnaire.code}
                            to={`${basePath}/questionnaires/${questionnaire.code}`}
                        >
                            <ListItemIcon>
                                <BallotOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={questionnaire.name} />
                        </MenuListItemLink>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default ProjectMenuQuestionnaires;
