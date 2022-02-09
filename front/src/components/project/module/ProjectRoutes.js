import {Route} from "react-router-dom";
import {
    ListProjectsPage,
    CreateProjectPage,
    ViewProjectPage,
    ViewProjectInfoSubPage,
    ViewProjectLocationSubPage,
    ViewProjectFinancingSubPage,
    ViewProjectContactsSubPage,
    UpdateProjectProviderPanel,
} from "components/project/container";
import {UpdateProjectProviderContactPanel} from "components/provider/container";

const projectRoutes = [
    <Route key="project-new" path="new" element={<CreateProjectPage />} />,
    <Route key="project-detail" path=":id" element={<ViewProjectPage />}>
        <Route
            key="project-location"
            path="location"
            element={<ViewProjectLocationSubPage />}
        />
        <Route
            key="project-financing"
            path="financing"
            element={<ViewProjectFinancingSubPage />}
        />
        <Route
            key="project-contacts"
            path="contacts"
            element={<ViewProjectContactsSubPage />}
        />
        <Route key="project-info" path="" element={<ViewProjectInfoSubPage />}>
            <Route
                key="project-provider"
                path="provider/:action"
                element={<UpdateProjectProviderPanel />}
            />
            <Route
                key="project-provider-contact"
                path="provider/contact/:contactId/:action"
                element={<UpdateProjectProviderContactPanel />}
            />
        </Route>
    </Route>,
    <Route key="project-list" path="" element={<ListProjectsPage />} />,
];

export default projectRoutes;
