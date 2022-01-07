import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider, AuthRequired} from "auth";

import {BaseLayout} from "layout";
import {LoginPage} from "components/user/container";
import {
    ListProjectsPage,
    ViewProjectPage,
    ViewProjectInfoSubPage,
    ViewProjectLocationSubPage,
    ViewProjectFinancingSubPage,
    ViewProjectContactsSubPage,
} from "components/project/container";

export default function AppRoutes() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<BaseLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <AuthRequired>
                                    <ListProjectsPage />
                                </AuthRequired>
                            }
                        />
                        <Route
                            path="/project/:id"
                            element={
                                <AuthRequired>
                                    <ViewProjectPage />
                                </AuthRequired>
                            }
                        >
                            <Route path="" element={<ViewProjectInfoSubPage />} />
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
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
