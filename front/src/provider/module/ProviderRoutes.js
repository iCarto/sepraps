import {Route} from "react-router-dom";
import {
    CreateProviderPage,
    ListProvidersPage,
    ManageProvidersPage,
    UpdateProviderPanel,
    ViewProviderContactsSubPage,
    ViewProviderPage,
    ViewProviderPanel,
    ViewProviderSummarySubPage,
} from "provider/container";
import {ViewDocumentPanel} from "base/file/components";

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
            {/* 
            <Route
                key="provider-documents"
                path="documents/*"
                element={<ViewProviderDocumentsSubPage />}
            >
                <Route
                    key="provider-documents-view"
                    path="detail/*"
                    element={<ViewDocumentPanel />}
                />
            </Route> */}
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
            />
        </Route>
    </Route>,
];

export default providerRoutes;
