import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider, AuthRequired} from "auth";

import {BaseLayout} from "layout";
import {LoginPage} from "components/user/container";
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

export default function AppRoutes() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="" element={<BaseLayout />}>
                        <Route
                            path="/projects/new"
                            element={
                                <AuthRequired>
                                    <CreateProjectPage />
                                </AuthRequired>
                            }
                        />
                        <Route
                            path="/projects/:id"
                            element={
                                <AuthRequired>
                                    <ViewProjectPage />
                                </AuthRequired>
                            }
                        >
                            <Route path="" element={<ViewProjectInfoSubPage />}>
                                <Route
                                    path="provider/:action"
                                    element={<UpdateProjectProviderPanel />}
                                />
                            </Route>
                            <Route
                                path="location"
                                element={<ViewProjectLocationSubPage />}
                            />
                            <Route
                                path="financing"
                                element={<ViewProjectFinancingSubPage />}
                            />
                            <Route
                                path="contacts"
                                element={<ViewProjectContactsSubPage />}
                            />
                            <Route path="" element={<ViewProjectInfoSubPage />} />
                        </Route>
                        <Route
                            path="/projects"
                            element={
                                <AuthRequired>
                                    <ListProjectsPage />
                                </AuthRequired>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
