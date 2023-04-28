import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {AuthProvider} from "base/user/provider";
import {AuthRequired} from "base/user/utilities";
import {projectRoutes} from "project/module";
import {statsRoutes} from "stats/routes";
import {ViewHomePage} from "home/container";
import {SeprapsApp} from "sepraps/ui";
import {LoginPage} from "base/user/components";
import {ModuleLayout} from "base/ui/module/components";
import {ContractsModule, contractRoutes} from "contract/module";
import {ProvidersModule, providerRoutes} from "provider/module";
import {ProjectsModule} from "project/module";

export default function SeprapsRoutes() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="" element={<SeprapsApp />}>
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
                            path="contracts"
                            element={
                                <AuthRequired>
                                    <ContractsModule />
                                </AuthRequired>
                            }
                        >
                            {contractRoutes}
                        </Route>
                        <Route
                            path="projects"
                            element={
                                <AuthRequired>
                                    <ProjectsModule />
                                </AuthRequired>
                            }
                        >
                            {projectRoutes}
                        </Route>
                        <Route
                            path="providers"
                            element={
                                <AuthRequired>
                                    <ProvidersModule />
                                </AuthRequired>
                            }
                        >
                            {providerRoutes}
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
