import {useAuth} from "../provider";

const UserAuthRequired = ({user, children}) => {
    const {user: loggedUser} = useAuth();

    return loggedUser && user && loggedUser.username === user ? <>{children}</> : null;
};

export default UserAuthRequired;
