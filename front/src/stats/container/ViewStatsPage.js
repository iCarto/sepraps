import {PageLayout} from "base/ui/main";
import {StatsFilterProvider, StatsViewProvider} from "stats/provider";

const ViewStatsPage = () => {
    return (
        <StatsViewProvider>
            <StatsFilterProvider>
                <PageLayout subPage={true} />
            </StatsFilterProvider>
        </StatsViewProvider>
    );
};

export default ViewStatsPage;
