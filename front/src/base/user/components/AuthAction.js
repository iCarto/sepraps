import {useAuth} from "../provider";

const AuthAction = ({children, roles}) => {
    const {hasRole} = useAuth();

    const hasPermission = roles.some(role => hasRole(role));

    return roles.length === 0 || hasPermission ? <>{children}</> : null;
};

export default AuthAction;
