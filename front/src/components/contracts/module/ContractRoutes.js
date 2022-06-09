import {Route} from "react-router-dom";
import {UpdateContractContractorContactPanel} from "components/contractor/container";
import {ProjectListViewProvider} from "components/project/provider";
import {
    ListContractsPage,
    ViewContractPage,
    ViewContractInfoSubPage,
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
import {UpdateContractMonitoringProfilePanel} from "../container/monitoring";

const contractRoutes = [
    <Route key="contract-new" path="new" element={<CreateContractPage />} />,
    <Route key="contract-manage" path="" element={<ManageContractsPage />}>
        <Route key="contract-detail" path=":contractId" element={<ViewContractPage />}>
            <Route
                key="contract-info"
                path="summary"
                element={<ViewContractInfoSubPage />}
            >
                <Route
                    key="contract-contractor"
                    path="contractor/:contractorId/edit"
                    element={<UpdateContractContractorPanel />}
                />
                <Route
                    key="contract-contractor-new-add"
                    path="contractor/new/:action"
                    element={<AddContractContractorPanel />}
                />
                <Route
                    key="contract-contractor-contact"
                    path="contractor/contact/:contactId/:action"
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
                    path=":sectionName/:contactId/:action"
                    element={<UpdateContractMonitoringProfilePanel />}
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
                    path="project/:projectId"
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
        <Route key="contract-list" path="" element={<ListContractsPage />}>
            <Route
                key="contract-info"
                path="info/:contractId"
                element={<ViewContractPanel />}
            />
        </Route>
    </Route>,
];

export default contractRoutes;
