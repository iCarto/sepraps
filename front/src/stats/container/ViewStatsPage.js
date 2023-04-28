import {Outlet} from "react-router-dom";
import {PageWithMenuLayout} from "base/ui/main";
import {StatsMenu} from "../presentational";
import {StatsFilterProvider, StatsViewProvider} from "../provider";

const ViewStatsPage = () => {
    return (
        <PageWithMenuLayout menu={<StatsMenu />}>
            <StatsViewProvider>
                <StatsFilterProvider>
                    <Outlet />
                </StatsFilterProvider>
            </StatsViewProvider>
        </PageWithMenuLayout>
    );
};

export default ViewStatsPage;
