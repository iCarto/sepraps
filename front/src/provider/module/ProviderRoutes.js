import {Route} from "react-router-dom";
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
    ViewContactProviderPanel,
} from "provider/container";
import {ViewStatsByGenderSubPage} from "stats/container";

const providerRoutes = [
    <Route key="provider-new" path="new" element={<CreateProviderPage />} />,
    <Route key="provider-manage" path="" element={<ManageProvidersPage />}>
        <Route key="provider-list" path="list" element={<ListProvidersPage />}>
            <Route
                key="provider-info"
                path="info/:id"
                element={<ViewProviderPanel />}
            />
        </Route>
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
                    element={<ViewContactProviderPanel />}
                />
            </Route>
        </Route>
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
        </Route>
    </Route>,
];

export default providerRoutes;
