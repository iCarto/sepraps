import {Navigate, Route} from "react-router-dom";
import {
    ListFinancingProgramsPage,
    ManageFinancingProgramsPage,
    ViewFinancingProgramPage,
    ViewFinancingProgramPanel,
    ViewFinancingProgramSummarySubPage,
} from "financingprogram/container";

const financingProgramRoutes = [
    <Route
        key="financingprogram-manage"
        path="list"
        element={<ManageFinancingProgramsPage />}
    >
        <Route
            key="financingprogram-detail"
            path=":id"
            element={<ViewFinancingProgramPage />}
        >
            <Route
                key="financingprogram-summary"
                path="summary"
                element={<ViewFinancingProgramSummarySubPage />}
            ></Route>
            <Route index element={<Navigate to="summary" replace />} />
        </Route>
        <Route
            key="financingprogram-list"
            path=""
            element={<ListFinancingProgramsPage />}
        >
            <Route
                key="financingprogram-info"
                path="info/:id"
                element={<ViewFinancingProgramPanel />}
            />
        </Route>
    </Route>,
    <Route
        key="redirect-financingprogram-index"
        index
        element={<Navigate to="list" replace />}
    />,
];

export default financingProgramRoutes;
