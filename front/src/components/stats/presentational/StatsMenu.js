import {MenuListItemLink} from "components/common/presentational";
import {QuestionnairesMenu} from "components/questionnaire/presentational";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import {useEffect, useState} from "react";
import {QuestionnaireService} from "service/api/questionnaires";

const StatsMenu = () => {
    const [questionnaires, setQuestionnaires] = useState([]);

    useEffect(() => {
        QuestionnaireService.getQuestionnaires().then(questionnaires => {
            setQuestionnaires(questionnaires);
        });
    }, []);

    return (
        <Box sx={{height: "100%", backgroundColor: "grey.200"}}>
            <Divider />
            <Box>
                <MenuList sx={{pt: 0}}>
                    <MenuListItemLink to={`/stats/phase`}>
                        <ListItemIcon>
                            <LinearScaleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fases" />
                    </MenuListItemLink>
                    <QuestionnairesMenu
                        questionnaires={questionnaires}
                        basePath={`/stats`}
                    />
                </MenuList>
            </Box>
        </Box>
    );
};

export default StatsMenu;
