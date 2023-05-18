import {useNavigate} from "react-router-dom";

export function useNavigateWithReload() {
    const navigate = useNavigate();

    const customNavigate = (url, reload = false) => {
        if (reload) {
            navigate(url, {
                state: {lastRefreshDate: new Date()},
            });
        } else {
            navigate(url);
        }
    };

    return customNavigate;
}
