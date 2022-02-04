import {Route} from "react-router-dom";
import {
    ListProjectsPage,
    CreateProjectPage,
    ViewProjectPage,
    ViewProjectInfoSubPage,
    ViewProjectLocationSubPage,
    ViewProjectFinancingSubPage,
    ViewProjectContactsSubPage,
} from "components/project/container";

const projectRoutes = [
    <Route path="new" element={<CreateProjectPage />} />,
    <Route path=":id" element={<ViewProjectPage />}>
        <Route path="location" element={<ViewProjectLocationSubPage />} />
        <Route path="financing" element={<ViewProjectFinancingSubPage />} />
        <Route path="contacts" element={<ViewProjectContactsSubPage />} />
        <Route path="" element={<ViewProjectInfoSubPage />} />
    </Route>,
    <Route path="" element={<ListProjectsPage />} />,
];

export default projectRoutes;
