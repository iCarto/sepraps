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

    let value = {user, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export {useAuth};
