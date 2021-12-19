import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider, AuthRequired} from "auth";

import {BaseLayout} from "layout";
import {LoginPage} from "components/user/container";
import {MainPage} from "components/main/container";

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
                                    <MainPage />
                                </AuthRequired>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
