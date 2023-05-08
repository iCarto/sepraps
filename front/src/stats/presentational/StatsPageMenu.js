import {useEffect, useState} from "react";
import {QuestionnaireService} from "questionnaire/service";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";

import LinearScaleIcon from "@mui/icons-material/LinearScale";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";

const StatsPageMenu = () => {
    const [questionnaires, setQuestionnaires] = useState([]);

    const basePath = "/stats";

    useEffect(() => {
        QuestionnaireService.getQuestionnaires().then(questionnaires => {
            setQuestionnaires(questionnaires);
        });
    }, []);

    return (
        <>
            <PageMenu>
                <PageMenuListItemButton
                    key="providers-list"
                    to={`${basePath}/phase`}
                    text="Fases"
                    icon={<LinearScaleIcon />}
                />
                <PageMenuListItemButton
                    key="providers-stats"
                    to={`${basePath}/gender`}
                    text="Género"
                    icon={<PermContactCalendarOutlinedIcon />}
                />
                <QuestionnairesMenu
                    questionnaires={questionnaires}
                    basePath={`/stats`}
                />
            </PageMenu>
        </>
    );
};

export default StatsPageMenu;
