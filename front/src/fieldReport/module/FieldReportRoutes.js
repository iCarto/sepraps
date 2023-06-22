import {Route} from "react-router-dom";
import {
    CreateFieldReportPage,
    ListFieldReportsPage,
    ManageFieldReportsPage,
    UpdateFieldReportPanel,
    ViewFieldReportPage,
    ViewFieldReportPanel,
    ViewFieldReportSummarySubPage,
    ViewFieldReportProjectsSubPage,
    UpdateFieldReportGoalsPanel,
} from "fieldReport/container";
import {ViewDocumentPanel} from "base/file/components";

const fieldReportRoutes = [
    <Route key="field-report-new" path="new" element={<CreateFieldReportPage />} />,
    <Route key="field-report-manage" path="" element={<ManageFieldReportsPage />}>
        <Route key="field-report-list" path="list" element={<ListFieldReportsPage />}>
            <Route
                key="field-report-info"
                path="info/:id"
                element={<ViewFieldReportPanel />}
            />
        </Route>
        <Route key="field-report-detail" path=":id" element={<ViewFieldReportPage />}>
            <Route
                key="field-report-summary"
                path="summary"
                element={<ViewFieldReportSummarySubPage />}
            >
                <Route
                    key="field-report-summary-update"
                    path=":section/:action"
                    element={<UpdateFieldReportPanel />}
                />
                <Route
                    key="field-report-goals-update"
                    path="goals/:action/:goalId"
                    element={<UpdateFieldReportGoalsPanel />}
                />
            </Route>
            <Route
                key="field-report-projects"
                path="projects"
                element={<ViewFieldReportProjectsSubPage />}
            ></Route>
        </Route>
    </Route>,
];

export default fieldReportRoutes;
