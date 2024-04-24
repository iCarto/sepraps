import {Route} from "react-router-dom";
import {ManageStatsPage} from "stats/container";

const statsRoutes = [
    <Route key="stats-manage" path="" element={<ManageStatsPage />}></Route>,
];

export default statsRoutes;
