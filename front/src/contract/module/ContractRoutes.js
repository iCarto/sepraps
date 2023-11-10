import {Navigate, Route} from "react-router-dom";
import {UpdateContractContractorContactPanel} from "contractor/container";
import {
    ListContractsPage,
    ViewContractPage,
    ViewContractSummarySubPage,
    ViewContractProjectsSubPage,
    UpdateContractPanel,
    CreateContractPage,
    UpdateContractContractorPanel,
    AddContractContractorPanel,
    ViewContractProjectPanel,
    AddContractProjectPanel,
    ViewContractMonitoringSubPage,
    ManageContractsPage,
    ViewContractPanel,
    ViewContractQuestionnairesSubPage,
    ViewContractBudgetSubPage,
    CreateContractProjectPage,
    ViewContractPaymentsSubPage,
    ViewContractAwardingSubPage,
    ViewContractExecutionSubPage,
    ViewContractSupervisionAreaSubPage,
} from "../container";
import {ViewContactPanel} from "contact/container";
import {ViewPaymentContent, CreatePaymentContent} from "payment/container";
import {ViewDocumentPanel} from "base/file/components";
import {SUPERVISION_AREAS} from "contract/model";

const contractRoutes = [
    <Route key="contract-new" path="new" element={<CreateContractPage />} />,
    <Route key="contract-manage" path="list" element={<ManageContractsPage />}>
        <Route key="contract-detail" path=":id" element={<ViewContractPage />}>
            <Route
                key="contract-summary"
                path="summary"
                element={<ViewContractSummarySubPage />}
            >
                <Route
                    key="contract-general-data"
                    path=":section/:action"
                    element={<UpdateContractPanel />}
                />
            </Route>
            <Route
                key="contract-budget"
                path="budget"
                element={<ViewContractBudgetSubPage />}
            >
                <Route
                    key="contract-phases-data"
                    path=":section/:action"
                    element={<UpdateContractPanel />}
                />
            </Route>
            <Route
                key="contract-awarding"
                path="awarding"
                element={<ViewContractAwardingSubPage />}
            >
                <Route
                    key="contract-phases-data"
                    path=":section/:action"
                    element={<UpdateContractPanel />}
                />
                <Route
                    key="contract-contractor-add"
                    path="contractor/add/:contractorId"
                    element={<AddContractContractorPanel />}
                />
                <Route
                    key="contract-contractor-edit"
                    path="contractor/:contractorId/edit"
                    element={<UpdateContractContractorPanel />}
                />
                <Route
                    key="contract-monitoring-view-contact"
                    path="info/:contactId"
                    element={<ViewContactPanel />}
                />
                <Route
                    key="contract-contractor-contact"
                    path="contractor/contact/:action/:contactId"
                    element={<UpdateContractContractorContactPanel />}
                />
            </Route>
            <Route
                key="contract-budget"
                path="budget"
                element={<ViewContractBudgetSubPage />}
            >
                <Route
                    key="contract-phases-data"
                    path=":section/:action"
                    element={<UpdateContractPanel />}
                />
            </Route>
            <Route
                key="contract-execution"
                path="execution"
                element={<ViewContractExecutionSubPage />}
            >
                <Route
                    key="contract-phases-data"
                    path=":section/:action"
                    element={<UpdateContractPanel />}
                />
            </Route>
            <Route
                key="contract-projects"
                path="projects"
                element={<ViewContractProjectsSubPage />}
            >
                <Route
                    key="contract-project-add-existing"
                    path="add/existing"
                    element={<AddContractProjectPanel />}
                />
                <Route
                    key="contract-project-view"
                    path="project/:idInfoPanel"
                    element={<ViewContractProjectPanel />}
                />
            </Route>
            <Route
                key="contract-projects-add-new"
                path="projects/add/new"
                element={<CreateContractProjectPage />}
            />
            <Route
                key="contract-questionnaire-detail"
                path="questionnaires/:questionnaireCode"
                element={<ViewContractQuestionnairesSubPage />}
            ></Route>
            <Route
                key="contract-payments"
                path="payment"
                element={<ViewContractPaymentsSubPage />}
            >
                <Route
                    key="contract-payments-new"
                    path="new"
                    element={<CreatePaymentContent />}
                />
                <Route
                    key="contract-payments-detail"
                    path=":paymentId"
                    element={<ViewPaymentContent />}
                >
                    <Route
                        key="contract-payments-detail-documents-view"
                        path="document/:idDocument"
                        element={<ViewDocumentPanel />}
                    />
                </Route>
            </Route>
            <Route
                key="contract-building"
                path="building"
                element={
                    <ViewContractSupervisionAreaSubPage
                        area={SUPERVISION_AREAS.BUILDING}
                    />
                }
            />
            <Route
                key="contract-social"
                path="social"
                element={
                    <ViewContractSupervisionAreaSubPage
                        area={SUPERVISION_AREAS.SOCIAL}
                    />
                }
            />
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
