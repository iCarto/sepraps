import {Route} from "react-router-dom";
import {
    ListContractsPage,
    ViewContractPage,
    ViewContractInfoSubPage,
    ViewContractProjectsSubPage,
} from "../container";

const contractRoutes = [
    <Route key="contract-detail" path=":id" element={<ViewContractPage />}>
        <Route
            key="contract-projects"
            path="projects"
            element={<ViewContractProjectsSubPage />}
        />
        <Route key="contract-info" path="" element={<ViewContractInfoSubPage />} />
    </Route>,
    <Route key="contract-list" path="" element={<ListContractsPage />} />,
];

export default contractRoutes;
