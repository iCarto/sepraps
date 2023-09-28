import {Navigate, Route} from "react-router-dom";
import {
    ManageProjectsPage,
    ListProjectsPage,
    CreateProjectPage,
    ViewProjectPage,
    ViewProjectSummarySubPage,
    ViewProjectLocationSubPage,
    ViewProjectFinancingSubPage,
    ViewProjectMilestonesSubPage,
    ViewProjectContactsSubPage,
    ViewProjectDocumentsSubPage,
    ViewProjectQuestionnairesSubPage,
    UpdateProjectProviderPanel,
    UpdateProjectPanel,
    UpdateProjectMainInfrastructurePanel,
    ViewProjectPanel,
    AddProjectLinkedLocalitiesPanel,
    UpdateProjectQuestionnaireInstancePanel,
    ViewProjectProviderSubPage,
    ViewProjectsSupervisionPage,
    ViewProjectFieldReportSubPage,
    ViewProjectDocumentPanel,
    ViewProjectStatsPage,
} from "project/container";
import {UpdateProjectProviderContactPanel} from "provider/container";
import {UpdateMilestonePanel, ViewMilestonePanel} from "milestone/container";
import {AddProjectContractPanel} from "contract/container";
import {MapConfigProvider} from "base/geo/provider";
import {ViewContactPanel} from "contact/container";
import {
    ViewStatsByPhaseSubPage,
    ViewStatsByQuestionnairesSubPage,
} from "stats/container";

const projectRoutes = [
    <Route key="project-new" path="new" element={<CreateProjectPage />} />,
    <Route key="project-manage" path="list" element={<ManageProjectsPage />}>
        <Route key="project-detail" path=":id" element={<ViewProjectPage />}>
            <Route
                key="project-summary"
                path="summary"
                element={<ViewProjectSummarySubPage />}
            >
                <Route
                    key="project-general-data"
                    path=":section/:action"
                    element={<UpdateProjectPanel />}
                />
            </Route>
            <Route
                key="project-location"
                path=":section"
                element={<ViewProjectLocationSubPage />}
            >
                <Route
                    key="project-main-infrastructure-edit"
                    path="main_infrastructure/edit"
                    element={<UpdateProjectMainInfrastructurePanel />}
                />
                <Route
                    key="project-linked-localities-update"
                    path="linked_localities/:localityCode/:action"
                    element={<AddProjectLinkedLocalitiesPanel />}
                />
            </Route>
            <Route
                key="project-provider"
                path="provider"
                element={<ViewProjectProviderSubPage />}
            >
                <Route
                    key="project-provider-update"
                    path=":action/:providerId"
                    element={<UpdateProjectProviderPanel />}
                />
                <Route
                    key="project-provider-contact-update"
                    path="provider/contact/:contactId/:action"
                    element={<UpdateProjectProviderContactPanel />}
                />
            </Route>
            <Route
                key="project-financing"
                path="financing"
                element={<ViewProjectFinancingSubPage />}
            >
                <Route
                    key="project-contract-update"
                    path="contract/:contractId/:action"
                    element={<AddProjectContractPanel />}
                />
            </Route>
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
            >
                <Route
                    key="contract-contractor-view-contact"
                    path="info/:contactId"
                    element={<ViewContactPanel />}
                />
            </Route>
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
                key="project-questionnaire-detail"
                path="questionnaires/:questionnaireCode"
                element={<ViewProjectQuestionnairesSubPage />}
            >
                <Route
                    key="project-questionnaire-instance-edit"
                    path=":instanceId/:action"
                    element={<UpdateProjectQuestionnaireInstancePanel />}
                />
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
            <Route key="project-info" path="info/:id" element={<ViewProjectPanel />} />
        </Route>
    </Route>,
    <Route key="project-stats" path="stats" element={<ViewProjectStatsPage />}>
        <Route
            key="project-stats-by-phase"
            path="phase"
            element={<ViewStatsByPhaseSubPage />}
        />
        <Route
            key="-projectstats-by-questionnaires"
            path="questionnaires/:questionnaireCode"
            element={<ViewStatsByQuestionnairesSubPage />}
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
