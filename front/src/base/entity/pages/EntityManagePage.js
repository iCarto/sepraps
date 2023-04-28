import {Outlet} from "react-router-dom";
import {ListProvider} from "base/entity/hooks";

/**
 * High Order Component that stores filter and project list
 * @returns
 */
const EntityManagePage = () => {
    return (
        <ListProvider>
            <Outlet />
        </ListProvider>
    );
};

export default EntityManagePage;
