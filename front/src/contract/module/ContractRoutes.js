import {Navigate, Route} from "react-router-dom";
import {SUPERVISION_AREAS} from "contract/model";
import {
    ListContractsPage,
    ViewContractPage,
    ViewContractSummarySubPage,
    ViewContractProjectsSubPage,
    CreateContractPage,
    ManageContractsPage,
    ViewContractPanel,
    ViewContractBudgetSubPage,
    CreateContractProjectPage,
    ViewContractPaymentsSubPage,
    ViewContractAwardingSubPage,
    ViewContractExecutionSubPage,
    ViewContractBuildingAnalysisSubPage,
    ViewContractStaffSubPage,
    ViewContractPostExecutionSubPage,
    ViewContractBuildingAnalysisOverview,
    ViewContractBuildingComponentsAnalysisContent,
    CreateContractPaymentsWizard,
    ViewContractConnectionsAnalysisSubPage,
    ViewContractTrainingsAnalysisSubPage,
    ViewContractTrainingsAnalysisContent,
    ViewContractConnectionsTableContent,
    ViewContractPaymentsAnalysisContent,
} from "contract/container";
import {
    UpdateContractContactPanel,
    ViewContractContactPanel,
} from "contract/container/monitoring";
import {
    UpdateContractContractorContactPanel,
    ViewContractorContactPanel,
} from "contractor/container";
import {
    ViewPaymentContent,
    CreatePaymentContent,
    ViewPaymentsAnalysisContent,
    ViewPaymentContractOverview,
} from "payment/container";
import {ViewDocumentPanel} from "base/file/components";
import {ViewProjectPanel} from "project/container";

const contractRoutes = [
    <Route key="contract-new" path="new" element={<CreateContractPage />} />,
    <Route key="contract-manage" path="list" element={<ManageContractsPage />}>
        <Route key="contract-detail" path=":id" element={<ViewContractPage />}>
            <Route
                key="contract-summary"
                path="summary"
                element={<ViewContractSummarySubPage />}
            />
            <Route
                key="contract-budget"
                path="budget"
                element={<ViewContractBudgetSubPage />}
            />
            <Route
                key="contract-awarding"
                path="awarding"
                element={<ViewContractAwardingSubPage />}
            >
                <Route
                    key="contract-monitoring-view-contact"
                    path="info/:contactId"
                    element={<ViewContractorContactPanel />}
                />
                <Route
                    key="contract-contractor-contact"
                    path="contractor_staff/:action/:contactId"
                    element={<UpdateContractContractorContactPanel />}
                />
            </Route>
            <Route
                key="contract-budget"
                path="budget"
                element={<ViewContractBudgetSubPage />}
            />
            <Route
                key="contract-execution"
                path="execution"
                element={<ViewContractExecutionSubPage />}
            >
                <Route
                    key="contract-amendments-detail-documents-view"
                    path="document/:idDocument"
                    element={<ViewDocumentPanel />}
                />
            </Route>
            <Route
                key="contract-post-execution"
                path="post-execution"
                element={<ViewContractPostExecutionSubPage />}
            ></Route>
            <Route
                key="contract-projects"
                path="projects"
                element={<ViewContractProjectsSubPage />}
            >
                <Route
                    key="contract-project-view"
                    path="info/:idInfoPanel"
                    element={<ViewProjectPanel />}
                />
            </Route>
            <Route
                key="contract-projects-add-new"
                path="projects/add/new"
                element={<CreateContractProjectPage />}
            />
            <Route
                key="contract-payments"
                path="payment"
                element={<ViewContractPaymentsSubPage />}
            >
                <Route
                    key="contract-payments-overview"
                    path="overview"
                    element={<ViewPaymentContractOverview />}
                />
                <Route
                    key="contract-payments-new"
                    path="list/wizard"
                    element={<CreateContractPaymentsWizard />}
                />
                <Route
                    key="contract-payments-new"
                    path="list/new"
                    element={<CreatePaymentContent />}
                />
                <Route
                    key="contract-payments-detail"
                    path="list/:paymentId?"
                    element={<ViewPaymentContent />}
                >
                    <Route
                        key="contract-payments-detail-documents-view"
                        path="document/:idDocument"
                        element={<ViewDocumentPanel />}
                    />
                </Route>
                <Route
                    key="contract-payments-analysis"
                    path="analysis"
                    element={<ViewContractPaymentsAnalysisContent />}
                />
            </Route>
            <Route
                key="contract-building"
                path="building_staff"
                element={<ViewContractStaffSubPage area={SUPERVISION_AREAS.BUILDING} />}
            >
                <Route
                    key="contract-building-view-contact"
                    path="info/:contactId"
                    element={<ViewContractContactPanel />}
                />
                <Route
                    key="contract-building-manage-contact"
                    path=":action/:contactId"
                    element={
                        <UpdateContractContactPanel area={SUPERVISION_AREAS.BUILDING} />
                    }
                />
            </Route>
            <Route
                key="contract-project-analysis"
                path="buildingcomponents"
                element={<ViewContractBuildingAnalysisSubPage />}
            >
                <Route
                    key="contract-project-analysis-overview"
                    path="overview"
                    element={<ViewContractBuildingAnalysisOverview />}
                />
                <Route
                    key="contract-project-analysis-chart"
                    path="analysis"
                    element={<ViewContractBuildingComponentsAnalysisContent />}
                />
            </Route>
            <Route
                key="contract-social"
                path="social_staff"
                element={<ViewContractStaffSubPage area={SUPERVISION_AREAS.SOCIAL} />}
            >
                <Route
                    key="contract-social-view-contact"
                    path="info/:contactId"
                    element={<ViewContractContactPanel />}
                />
                <Route
                    key="contract-social-manage-contact"
                    path=":action/:contactId"
                    element={
                        <UpdateContractContactPanel area={SUPERVISION_AREAS.SOCIAL} />
                    }
                />
            </Route>
            <Route
                key="contract-project-social-trainings"
                path="trainings"
                element={<ViewContractTrainingsAnalysisSubPage />}
            >
                <Route
                    key="contract-project-analysis-components-table"
                    path="overview"
                    element={<ViewContractTrainingsAnalysisContent />}
                />
            </Route>
            <Route
                key="contract-project-social-connections"
                path="connections"
                element={<ViewContractConnectionsAnalysisSubPage />}
            >
                <Route
                    key="contract-project-analysis-connections-table"
                    path="overview"
                    element={<ViewContractConnectionsTableContent />}
                />
            </Route>
            <Route index element={<Navigate to="summary" replace />} />
        </Route>
        <Route key="contract-list" path="" element={<ListContractsPage />}>
            <Route
                key="contract-info"
                path="info/:id"
                element={<ViewContractPanel />}
            />
        </Route>
    </Route>,
    <Route
        key="redirect-contract-index"
        index
        element={<Navigate to="list" replace />}
    />,
];

export default contractRoutes;
