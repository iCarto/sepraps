import {useNavigate} from "react-router-dom";
import {IdleTimerProvider} from "react-idle-timer";
import {APP_NAME} from "base/ui/app/config/appInfo";

const IdleLogoutTimer = ({children}) => {
    let navigate = useNavigate();

    const onIdle = () => {
        navigate("/login", {state: {error: "IDLE_LOGOUT"}});
    };

    const onAction = event => {
        // Do something when a user triggers a watched event
    };

    return (
        <IdleTimerProvider
            timeout={1000 * parseInt(process.env.REACT_APP_IDLE_SECONDS_LOGOUT)}
            crossTab={true}
            name={APP_NAME}
            syncTimers={250}
            onIdle={onIdle}
            onAction={onAction}
        >
            {children}
        </IdleTimerProvider>
    );
};

export default IdleLogoutTimer;
