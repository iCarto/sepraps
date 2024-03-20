import {Navigate, Route} from "react-router-dom";
import {
    CreateProviderPage,
    ListProvidersPage,
    ManageProvidersPage,
    UpdateProviderContactPanel,
    UpdateProviderPanel,
    ViewProviderContactsSubPage,
    ViewProviderPage,
    ViewProviderPanel,
    ViewProvidersStatsPage,
    ViewProviderSummarySubPage,
    ViewProvidersContactsSubPage,
    ViewProviderContactPanel,
    ViewProviderProjectsSubPage,
    ViewProviderProjectPanel,
} from "provider/container";
import {ViewStatsByGenderSubPage} from "stats/container";

const providerRoutes = [
    <Route key="provider-new" path="new" element={<CreateProviderPage />} />,
    <Route key="provider-manage" path="list" element={<ManageProvidersPage />}>
        <Route key="provider-detail" path=":id" element={<ViewProviderPage />}>
            <Route
                key="provider-summary"
                path="summary"
                element={<ViewProviderSummarySubPage />}
            >
                <Route
                    key="provider-summary-update"
                    path=":section/:action"
                    element={<UpdateProviderPanel />}
                />
            </Route>
            <Route
                key="provider-contacts"
                path="contacts"
                element={<ViewProviderContactsSubPage />}
            >
                <Route
                    key="provider-contacts-edit"
                    path=":action/:contactId"
                    element={<UpdateProviderContactPanel />}
                />
                <Route
                    key="provider-contact-info"
                    path="info/:contactId"
                    element={<ViewProviderContactPanel />}
                />
            </Route>
            <Route
                key="provider-projects"
                path="projects"
                element={<ViewProviderProjectsSubPage />}
            >
                <Route
                    key="provider-project-view"
                    path="project/:idInfoPanel"
                    element={<ViewProviderProjectPanel />}
                />
            </Route>
            <Route index element={<Navigate to="summary" replace />} />
        </Route>
        <Route key="provider-list" path="" element={<ListProvidersPage />}>
            <Route
                key="provider-info"
                path="info/:id"
                element={<ViewProviderPanel />}
            />
        </Route>
    </Route>,
    <Route key="providers-stats" path="stats" element={<ViewProvidersStatsPage />}>
        <Route
            key="providers-stats-by-gender"
            path="gender"
            element={<ViewStatsByGenderSubPage />}
        ></Route>
        <Route
            key="providers-contacts"
            path="contacts"
            element={<ViewProvidersContactsSubPage />}
        ></Route>
        <Route index element={<Navigate to="gender" replace />} />
    </Route>,
    <Route
        key="redirect-provider-index"
        index
        element={<Navigate to="list" replace />}
    />,
];

export default providerRoutes;
