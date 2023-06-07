import {Route} from "react-router-dom";
import {
    ViewStatsByPhaseSubPage,
    ViewStatsPage,
    ViewStatsByQuestionnairesSubPage,
    ManageStatsPage,
} from "stats/container";

const statsRoutes = [
    <Route key="stats-manage" path="" element={<ManageStatsPage />}>
        <Route key="stats" path="" element={<ViewStatsPage />}>
            <Route
                key="stats-by-phase"
                path="phase"
                element={<ViewStatsByPhaseSubPage />}
            ></Route>
            <Route
                key="stats-by-questionnaires"
                path="questionnaires/:questionnaireCode"
                element={<ViewStatsByQuestionnairesSubPage />}
            ></Route>
        </Route>
    </Route>,
];

export default statsRoutes;
