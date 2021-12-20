import {Outlet} from "react-router-dom";
import Header from "./Header";

export default function BaseLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
