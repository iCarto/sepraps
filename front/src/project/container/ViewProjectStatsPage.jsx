import {ListProvider} from "base/entity/hooks";
import {PageLayout} from "base/ui/main";
import {ProjectStatsSubPageMenu} from "project/menu";
import {StatsFilterProvider, StatsViewProvider} from "stats/provider";

const ViewProjectStatsPage = () => {
    return (
        <ListProvider>
            <StatsViewProvider>
                <StatsFilterProvider>
                    <PageLayout menu={<ProjectStatsSubPageMenu />} subPage={true} />
                </StatsFilterProvider>
            </StatsViewProvider>
        </ListProvider>
    );
};
export default ViewProjectStatsPage;
