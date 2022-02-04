import {Route} from "react-router-dom";
import {
    ListContractsPage,
    ViewContractInfoSubPage,
    ViewContractPage,
} from "../container";

const contractRoutes = [
    <Route path=":id" element={<ViewContractPage />}>
        <Route path="" element={<ViewContractInfoSubPage />} />
    </Route>,
    <Route path="" element={<ListContractsPage />} />,
];

export default contractRoutes;
