import {Route} from "react-router-dom";
import {
    CreateFieldReportPage,
    ListFieldReportsPage,
    ManageFieldReportsPage,
    ViewFieldReportPage,
    ViewFieldReportPanel,
    ViewFieldReportSummarySubPage,
    ViewFieldReportProjectsSubPage,
    ViewFieldReportCoverSubPage,
    ViewFieldReportIntroSubPage,
} from "fieldReport/container";
import {FieldReportProjectsSection} from "fieldReport/presentational/section";
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
            />
            <Route
                key="field-report-cover"
                path="cover"
                element={<ViewFieldReportCoverSubPage />}
            />
            <Route
                key="field-report-intro"
                path="intro"
                element={<ViewFieldReportIntroSubPage />}
            />
            <Route
                key="field-report-projects"
                path="projects"
                element={<ViewFieldReportProjectsSubPage />}
            >
                <Route
                    key="field-report-projects-tabs"
                    path=":tab"
                    element={<FieldReportProjectsSection />}
                />
            </Route>
        </Route>
    </Route>,
];

export default fieldReportRoutes;
