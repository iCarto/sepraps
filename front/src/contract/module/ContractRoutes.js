import {Route} from "react-router-dom";
import {UpdateContractContractorContactPanel} from "contractor/container";
import {ProjectListViewProvider} from "project/provider";
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
    ViewContractPhasesSubPage,
    CreateContractProjectPage,
} from "../container";
import {UpdateContractContactPanel} from "../container/monitoring";

const contractRoutes = [
    <Route key="contract-new" path="new" element={<CreateContractPage />} />,
    <Route key="contract-manage" path="" element={<ManageContractsPage />}>
        <Route key="contract-list" path="list" element={<ListContractsPage />}>
            <Route
                key="contract-info"
                path="info/:id"
                element={<ViewContractPanel />}
            />
        </Route>
        <Route key="contract-detail" path=":id" element={<ViewContractPage />}>
            <Route
                key="contract-summary"
                path="summary"
                element={<ViewContractSummarySubPage />}
            >
                <Route
                    key="contract-contractor-edit"
                    path="contractor/edit/:contractorId"
                    element={<UpdateContractContractorPanel />}
                />
                <Route
                    key="contract-contractor-add"
                    path="contractor/add/:contractorId"
                    element={<AddContractContractorPanel />}
                />
                <Route
                    key="contract-contractor-contact"
                    path="contractor/contact/:action/:contactId"
                    element={<UpdateContractContractorContactPanel />}
                />
                <Route
                    key="contract-general-data"
                    path=":section/:action"
                    element={<UpdateContractPanel />}
                />
            </Route>

            <Route
                key="contract-phases"
                path="phases"
                element={<ViewContractPhasesSubPage />}
            >
                <Route
                    key="contract-phases-data"
                    path=":section/:action"
                    element={<UpdateContractPanel />}
                />
            </Route>

            <Route
                key="contract-monitoring"
                path="monitoring"
                element={<ViewContractMonitoringSubPage />}
            >
                <Route
                    key="contract-monitoring-profile-edit"
                    path=":action/:contactId"
                    element={<UpdateContractContactPanel />}
                />
            </Route>

            <Route
                key="contract-projects"
                path="projects"
                element={
                    <ProjectListViewProvider>
                        <ViewContractProjectsSubPage />
                    </ProjectListViewProvider>
                }
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
        </Route>
    </Route>,
];

export default contractRoutes;
