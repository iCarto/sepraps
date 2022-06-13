import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider, AuthRequired} from "auth";

import {MainLayout, ModuleLayout} from "layout";
import {LoginPage} from "components/user/container";
import {projectRoutes} from "components/project/module";
import {contractRoutes} from "components/contracts/module";
import {statsRoutes} from "components/stats/module";
import {ViewHomePage} from "components/home/container";

export default function AppRoutes() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="" element={<MainLayout />}>
                        <Route
                            path=""
                            element={
                                <AuthRequired>
                                    <ModuleLayout />
                                </AuthRequired>
                            }
                        >
                            <Route key="home" path="" element={<ViewHomePage />} />
                        </Route>
                        <Route
                            path="projects"
                            element={
                                <AuthRequired>
                                    <ModuleLayout />
                                </AuthRequired>
                            }
                        >
                            {projectRoutes}
                        </Route>
                        <Route
                            path="contracts"
                            element={
                                <AuthRequired>
                                    <ModuleLayout />
                                </AuthRequired>
                            }
                        >
                            {contractRoutes}
                        </Route>
                        <Route
                            path="stats"
                            element={
                                <AuthRequired>
                                    <ModuleLayout />
                                </AuthRequired>
                            }
                        >
                            {statsRoutes}
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
