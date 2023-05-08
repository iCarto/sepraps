import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {StatsModule, statsRoutes} from "stats/module";
import {ContractsModule, contractRoutes} from "contract/module";
import {ProvidersModule, providerRoutes} from "provider/module";
import {ProjectsModule, projectRoutes} from "project/module";
import {AuthProvider} from "base/user/provider";
import {AuthRequired} from "base/user/utilities";

import {ModuleLayout} from "base/ui/module/components";
import {SeprapsApp} from "sepraps/ui";
import {ViewHomePage} from "home/container";
import {LoginPage} from "base/user/components";

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
                                    <StatsModule />
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
