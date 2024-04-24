import {Navigate, Route} from "react-router-dom";
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
    ViewFieldReportDocumentsSubPage,
} from "fieldReport/container";
import {FieldReportProjectsSection} from "fieldReportProject/presentational/section";
import {ViewDocumentPanel} from "base/file/components";

const fieldReportRoutes = [
    <Route key="field-report-new" path="new" element={<CreateFieldReportPage />} />,
    <Route key="field-report-manage" path="list" element={<ManageFieldReportsPage />}>
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
                    path=":fieldReportProjectId"
                    element={<FieldReportProjectsSection />}
                />
            </Route>
            <Route
                key="field-report-documents"
                path="documents/*"
                element={<ViewFieldReportDocumentsSubPage />}
            >
                <Route
                    key="field-report-documents-view"
                    path="detail/*"
                    element={<ViewDocumentPanel />}
                />
            </Route>
            <Route index element={<Navigate to="summary" replace />} />
        </Route>
        <Route key="field-report-list" path="" element={<ListFieldReportsPage />}>
            <Route
                key="field-report-info"
                path="info/:id"
                element={<ViewFieldReportPanel />}
            />
        </Route>
    </Route>,
    <Route
        key="redirect-field-report-index"
        index
        element={<Navigate to="list" replace />}
    />,
];

export default fieldReportRoutes;
