import {Navigate, Route} from "react-router-dom";
import {
    ManageProjectsPage,
    ListProjectsPage,
    CreateProjectPage,
    ViewProjectPage,
    ViewProjectSummarySubPage,
    ViewProjectLocationSubPage,
    ViewProjectContractsSubPage,
    ViewProjectMilestonesSubPage,
    ViewProjectContactsSubPage,
    ViewProjectDocumentsSubPage,
    ViewProjectPanel,
    ViewProjectFieldReportSubPage,
    ViewProjectDocumentPanel,
    ViewProjectStatsPage,
    ViewProjectBuildingComponentsSubPage,
    ViewProjectSocialComponentSubPage,
    ViewProjectConnectionsContent,
    ViewProjectSocialAnalysisContent,
    ViewProjectCertificationsSubPage,
    ViewProjectBuildingComponentsAnalysisContent,
    ViewProjectConnectionsSubPage,
} from "project/container";
import {UpdateMilestonePanel, ViewMilestonePanel} from "milestone/container";
import {MapConfigProvider} from "base/geo/provider";
import {ViewStatsByPhaseSubPage} from "stats/container";
import {ViewDocumentPanel} from "base/file/components";
import {
    ViewBuildingComponentContent,
    ViewBuildingComponentsAnalysisContent,
    ViewBuildingComponentsOverview,
} from "buildingComponent/container";
import {
    CreateSocialComponentContent,
    ViewSocialComponentContent,
} from "socialComponentMonitoring/container";

import {ViewSocialComponentsOverview} from "socialComponent/container";
import {ViewBuildingComponentMonitoringDocumentPanel} from "buildingComponentMonitoring/container";
import {
    CreateCertificationContent,
    ViewCertificationContent,
    ViewCertificationsAnalysisContent,
    ViewCertificationsOverview,
} from "certification/container";
import {ViewConnectionsOverview} from "connection/container";

const projectRoutes = [
    <Route key="project-new" path="new" element={<CreateProjectPage />} />,
    <Route key="project-manage" path="list" element={<ManageProjectsPage />}>
        <Route key="project-detail" path=":id" element={<ViewProjectPage />}>
            <Route
                key="project-summary"
                path="summary"
                element={<ViewProjectSummarySubPage />}
            ></Route>
            <Route
                key="project-location"
                path=":section"
                element={<ViewProjectLocationSubPage />}
            ></Route>
            <Route
                key="project-milestones"
                path="milestones"
                element={<ViewProjectMilestonesSubPage />}
            >
                <Route
                    key="project-milestones-edit"
                    path=":milestoneId/edit"
                    element={<UpdateMilestonePanel />}
                />
                <Route
                    key="project-milestones-view"
                    path="info/:milestoneId"
                    element={<ViewMilestonePanel />}
                />
            </Route>
            <Route
                key="project-contacts"
                path="contacts"
                element={<ViewProjectContactsSubPage />}
            />
            <Route
                key="project-documents"
                path="documents/*"
                element={<ViewProjectDocumentsSubPage />}
            >
                <Route
                    key="project-documents-view"
                    path="detail/*"
                    element={<ViewProjectDocumentPanel />}
                />
            </Route>
            <Route
                key="project-building-components"
                path="buildingcomponents"
                element={<ViewProjectBuildingComponentsSubPage />}
            >
                <Route
                    key="project-building-components-overview"
                    path="overview"
                    element={<ViewBuildingComponentsOverview />}
                />
                <Route
                    key="project-building-components-detail"
                    path="list/:buildingComponentId?"
                    element={<ViewBuildingComponentContent />}
                >
                    <Route
                        key="project-building-components-detail-documents-view"
                        path="document/:idDocument"
                        element={<ViewBuildingComponentMonitoringDocumentPanel />}
                    />
                </Route>
                <Route
                    key="project-component-analysis"
                    path="analysis"
                    element={<ViewProjectBuildingComponentsAnalysisContent />}
                />
            </Route>

            <Route
                key="project-certifications"
                path="certifications"
                element={<ViewProjectCertificationsSubPage />}
            >
                <Route
                    key="project-certifications-new"
                    path="list/new"
                    element={<CreateCertificationContent />}
                />
                <Route
                    key="project-certifications-overview"
                    path="overview"
                    element={<ViewCertificationsOverview />}
                />
                <Route
                    key="project-certifications-detail"
                    path="list/:certificationId?"
                    element={<ViewCertificationContent />}
                >
                    <Route
                        key="project-certifications-detail-documents-view"
                        path="document/:idDocument"
                        element={<ViewDocumentPanel />}
                    />
                </Route>
                <Route
                    key="project-certifications-analysis"
                    path="analysis"
                    element={<ViewCertificationsAnalysisContent />}
                />
            </Route>
            <Route
                key="project-social-components"
                path="socialcomponents"
                element={<ViewProjectSocialComponentSubPage />}
            >
                <Route
                    key="project-social-components-overview"
                    path="overview"
                    element={<ViewSocialComponentsOverview />}
                />
                <Route
                    key="project-social-components-new"
                    path="list/new"
                    element={<CreateSocialComponentContent />}
                />
                <Route
                    key="project-social-components-detail"
                    path="list/:socialComponentId?"
                    element={<ViewSocialComponentContent />}
                >
                    <Route
                        key="project-social-components-detail-documents-view"
                        path="document/:idDocument"
                        element={<ViewDocumentPanel />}
                    />
                </Route>
                <Route
                    key="project-social-component-analysis"
                    path="analysis"
                    element={<ViewProjectSocialAnalysisContent />}
                />
            </Route>
            <Route
                key="project-connections"
                path="connections"
                element={<ViewProjectConnectionsSubPage />}
            >
                <Route
                    key="project-social-components-overview"
                    path="overview"
                    element={<ViewConnectionsOverview />}
                />
                <Route
                    key="project-connections-detail"
                    path="manage"
                    element={<ViewProjectConnectionsContent />}
                >
                    <Route
                        key="project-connections-detail-documents-view"
                        path="document/:idDocument"
                        element={<ViewDocumentPanel />}
                    />
                </Route>
            </Route>
            <Route
                key="project-fieldreport-detail"
                path="fieldreport/:fieldReportId?"
                element={<ViewProjectFieldReportSubPage />}
            />
            <Route index element={<Navigate to="summary" replace />} />
        </Route>
        <Route
            key="project-list"
            path=""
            element={
                <MapConfigProvider>
                    <ListProjectsPage />
                </MapConfigProvider>
            }
        >
            <Route
                key="project-info"
                path="info/:idInfoPanel"
                element={<ViewProjectPanel />}
            />
        </Route>
    </Route>,
    <Route key="project-stats" path="stats" element={<ViewProjectStatsPage />}>
        <Route
            key="project-stats-by-phase"
            path="phase"
            element={<ViewStatsByPhaseSubPage />}
        />
        <Route index element={<Navigate to="phase" replace />} />
    </Route>,
    <Route
        key="redirect-project-index"
        index
        element={<Navigate to="list" replace />}
    />,
];

export default projectRoutes;
