import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider, AuthRequired} from "auth";

import {BaseLayout} from "layout";
import {LoginPage} from "components/user/container";
import {ListProjectsPage} from "components/project/container";

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
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
