import {useState, createContext, useContext} from "react";
import AuthService from "./AuthService";

let AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        return AuthService.getUsername();
    });

    const login = (username, password) => {
        return AuthService.login(username, password).then(userData => {
            setUser(AuthService.getUsername());
        });
    };

    const logout = () => {
        return AuthService.logout().then(() => {
            setUser(null);
        });
    };

    const hasRole = role => {
        return user && user.roles && user.roles.includes(role);
    };

    const ROLES = {
        EDIT: "edicion",
        MANAGEMENT: "gestion",
        VIEW: "visualizacion",
        SUPERVISION: "supervision",
    };

    let value = {user, login, logout, hasRole, ROLES};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export {useAuth};
