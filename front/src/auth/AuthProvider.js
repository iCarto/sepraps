import {useState, createContext, useContext} from "react";
import AuthService from "./AuthService";

let AuthContext = createContext(null);

export default function AuthProvider({children}) {
    let [user, setUser] = useState(() => {
        let username = AuthService.getUsername();
        return username;
    });

    let login = (username, password) => {
        return AuthService.login(username, password).then(userData => {
            setUser(userData);
        });
    };

    let logout = () => {
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
