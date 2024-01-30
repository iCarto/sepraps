import {Navigate, Route} from "react-router-dom";
import {SUPERVISION_AREAS} from "contract/model";
import {
    ListContractsPage,
    ViewContractPage,
    ViewContractSummarySubPage,
    ViewContractProjectsSubPage,
    CreateContractPage,
    ViewContractProjectPanel,
    AddContractProjectPanel,
    ManageContractsPage,
    ViewContractPanel,
    ViewContractQuestionnairesSubPage,
    ViewContractBudgetSubPage,
    CreateContractProjectPage,
    ViewContractPaymentsSubPage,
    ViewContractAwardingSubPage,
    ViewContractExecutionSubPage,
    ViewContractBuildingAnalysisSubPage,
    ViewContractStaffSubPage,
    ViewContractPostExecutionSubPage,
    ViewContractSocialAnalysisSubPage,
} from "contract/container";
import {UpdateContractContactPanel} from "contract/container/monitoring";
import {UpdateContractContractorContactPanel} from "contractor/container";
import {ViewContactPanel} from "contact/container";
import {
    ViewPaymentContent,
    CreatePaymentContent,
    ViewPaymentsAnalysisContent,
} from "payment/container";
import {ViewDocumentPanel} from "base/file/components";

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
                <Route
                    key="contract-payments-analysis"
                    path="analysis"
                    element={<ViewPaymentsAnalysisContent />}
                />
            </Route>
            <Route
                key="contract-building"
                path="building_staff"
                element={<ViewContractStaffSubPage area={SUPERVISION_AREAS.BUILDING} />}
            >
                <Route
                    key="contract-building-update-contact"
                    path="edit/:contactId"
                    element={<UpdateContractContactPanel />}
                />
            </Route>
            <Route
                key="contract-project-analysis"
                path="project_analysis"
                element={<ViewContractBuildingAnalysisSubPage />}
            />
            <Route
                key="contract-social"
                path="social_staff"
                element={<ViewContractStaffSubPage area={SUPERVISION_AREAS.SOCIAL} />}
            />
            <Route
                key="contract-project-social-analysis"
                path="project_social_analysis"
                element={<ViewContractSocialAnalysisSubPage />}
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
