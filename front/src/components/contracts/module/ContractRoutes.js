import {UpdateContractContractorContactPanel} from "components/contractor/container";
import {UpdateProjectPanel, ViewProjectPanel} from "components/project/container";
import {Route} from "react-router-dom";
import {
    ListContractsPage,
    ViewContractPage,
    ViewContractInfoSubPage,
    ViewContractProjectsSubPage,
    UpdateContractPanel,
    CreateContractPage,
    UpdateContractContractorPanel,
} from "../container";

const contractRoutes = [
    <Route key="contract-new" path="new" element={<CreateContractPage />} />,
    <Route key="contract-detail" path=":id" element={<ViewContractPage />}>
        <Route
            key="contract-projects"
            path="projects"
            element={<ViewContractProjectsSubPage />}
        >
            <Route
                key="contract-project-update"
                path=":projectId/:action"
                element={<UpdateProjectPanel />}
            />
            <Route
                key="contract-project-view"
                path=":projectId"
                element={<ViewProjectPanel />}
            />
        </Route>

        <Route key="contract-info" path="" element={<ViewContractInfoSubPage />}>
            <Route
                key="contract-contractor"
                path="contractor/:action"
                element={<UpdateContractContractorPanel />}
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
    </Route>,
    <Route key="contract-list" path="" element={<ListContractsPage />} />,
];

export default contractRoutes;
