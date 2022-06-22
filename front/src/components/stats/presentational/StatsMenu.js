import {useEffect, useState} from "react";
import {QuestionnaireService} from "service/api/questionnaires";
import {MenuListItemLink} from "components/common/presentational";
import {QuestionnairesMenu} from "components/questionnaire/presentational";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";

const StatsMenu = () => {
    const [questionnaires, setQuestionnaires] = useState([]);

    useEffect(() => {
        QuestionnaireService.getQuestionnaires().then(questionnaires => {
            setQuestionnaires(questionnaires);
        });
    }, []);

    return (
        <Box sx={{height: "100%", backgroundColor: "#ffff"}}>
            <Divider />
            <Box>
                <MenuList sx={{pt: 0}}>
                    <MenuListItemLink
                        to={`/stats/phase`}
                        text="Fases"
                        icon={<LinearScaleIcon />}
                    />
                    <QuestionnairesMenu
                        questionnaires={questionnaires}
                        basePath={`/stats`}
                    />
                    <MenuListItemLink
                        to={`/stats/gender`}
                        text="Género"
                        icon={<PermContactCalendarOutlinedIcon />}
                    />
                </MenuList>
            </Box>
        </Box>
    );
};

export default StatsMenu;
