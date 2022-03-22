import {UpdateContractContractorContactPanel} from "components/contractor/container";
import {Route} from "react-router-dom";
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
} from "../container";
import {UpdateContractMonitoringProfilePanel} from "../container/monitoring";

const contractRoutes = [
    <Route key="contract-new" path="new" element={<CreateContractPage />} />,
    <Route key="contract-detail" path=":id" element={<ViewContractPage />}>
        <Route key="contract-info" path="" element={<ViewContractInfoSubPage />}>
            <Route
                key="contract-contractor"
                path="contractor/:contractorId/edit"
                element={<UpdateContractContractorPanel />}
            />
            <Route
                key="contract-contractor-new-add"
                path="contractor/new/add"
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
            element={<ViewContractProjectsSubPage />}
        >
            <Route
                key="contract-project-add"
                path="new/add"
                element={<AddContractProjectPanel />}
            />
            <Route
                key="contract-project-view"
                path="project/:projectId"
                element={<ViewContractProjectPanel />}
            />
        </Route>
    </Route>,
    <Route key="contract-list" path="" element={<ListContractsPage />} />,
];

export default contractRoutes;
