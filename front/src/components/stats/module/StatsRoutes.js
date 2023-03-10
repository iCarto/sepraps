import {Route} from "react-router-dom";
import {
    ViewStatsByPhaseSubPage,
    ViewStatsPage,
    ViewStatsByQuestionnairesSubPage,
    ViewStatsByGenderSubPage,
} from "../container";

const statsRoutes = [
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
        <Route
            key="stats-by-gender"
            path="gender"
            element={<ViewStatsByGenderSubPage />}
        ></Route>
    </Route>,
];

export default statsRoutes;
