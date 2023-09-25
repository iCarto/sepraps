import {useEffect, useState} from "react";
import {QuestionnaireService} from "questionnaire/service";
import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";

import LinearScaleIcon from "@mui/icons-material/LinearScale";

const ProjectStatsSubPageMenu = () => {
    const [questionnaires, setQuestionnaires] = useState([]);

    const basePath = "/projects/stats";

    useEffect(() => {
        QuestionnaireService.getQuestionnaires().then(questionnaires => {
            setQuestionnaires(questionnaires);
        });
    }, []);

    return (
        <SubPageMenu headerTitle="Estadísticas" headerText="Proyectos">
            <SubPageMenuListItemButton
                key="providers-list"
                to={`${basePath}/phase`}
                text="Fases"
                icon={<LinearScaleIcon />}
            />
            <QuestionnairesMenu questionnaires={questionnaires} basePath={basePath} />
        </SubPageMenu>
    );
};

export default ProjectStatsSubPageMenu;
