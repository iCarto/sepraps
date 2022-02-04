import {Route} from "react-router-dom";
import {
    ListContractsPage,
    ViewContractPage,
    ViewContractInfoSubPage,
    ViewContractProjectsSubPage,
} from "../container";

const contractRoutes = [
    <Route path=":id" element={<ViewContractPage />}>
        <Route path="projects" element={<ViewContractProjectsSubPage />} />
        <Route path="" element={<ViewContractInfoSubPage />} />
    </Route>,
    <Route path="" element={<ListContractsPage />} />,
];

export default contractRoutes;
