import {Navigate, Route} from "react-router-dom";
import {
    ListFinancingProgramsPage,
    ManageFinancingProgramsPage,
    ViewFinancingProgramBuildingComponentsSubPage,
    ViewFinancingProgramConnectionsSubPage,
    ViewFinancingProgramPage,
    ViewFinancingProgramPanel,
    ViewFinancingProgramSummarySubPage,
    ViewFinancingProgramTrainingsSubPage,
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
            <Route
                key="financingprogram-building-components"
                path="buildingcomponents/overview"
                element={<ViewFinancingProgramBuildingComponentsSubPage />}
            />
            <Route
                key="financingprogram-trainings"
                path="trainings/overview"
                element={<ViewFinancingProgramTrainingsSubPage />}
            />
            <Route
                key="financingprogram-connections"
                path="connections/overview"
                element={<ViewFinancingProgramConnectionsSubPage />}
            />
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
