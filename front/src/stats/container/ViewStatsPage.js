import {PageLayout} from "base/ui/main";
import {StatsFilterProvider, StatsViewProvider} from "stats/provider";

const ViewStatsPage = () => {
    // TO-DO: Remove unneeded StatsFilterProvider component ?
    return (
        <StatsViewProvider>
            <StatsFilterProvider>
                <PageLayout subPage={true} />
            </StatsFilterProvider>
        </StatsViewProvider>
    );
};

export default ViewStatsPage;
