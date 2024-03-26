import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {ContractsModule, contractRoutes} from "contract/module";
import {ProjectsModule, projectRoutes} from "project/module";
import {ProvidersModule, providerRoutes} from "provider/module";
import {FieldReportsModule, fieldReportRoutes} from "fieldReport/module";
import {StatsModule, statsRoutes} from "stats/module";
import {AuthProvider} from "base/user/provider";
import {AuthRequired} from "base/user/utilities";

import {ModuleLayout} from "base/ui/module/components";
import {SeprapsApp} from "sepraps/ui";
import {ViewHomePage} from "home/container";
import {LoginPage} from "base/user/components";
import {FinancingProgramsModule, financingProgramRoutes} from "financingprogram/module";

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
                            path="financingprograms"
                            element={
                                <AuthRequired>
                                    <FinancingProgramsModule />
                                </AuthRequired>
                            }
                        >
                            {financingProgramRoutes}
                        </Route>
                        <Route
                            path="field-reports"
                            element={
                                <AuthRequired>
                                    <FieldReportsModule />
                                </AuthRequired>
                            }
                        >
                            {fieldReportRoutes}
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
