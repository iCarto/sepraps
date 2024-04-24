import {PageLayout} from "base/ui/main";
import {ProvidersStatsSubPageMenu} from "provider/menu";

const ViewProvidersStatsPage = () => {
    return <PageLayout menu={<ProvidersStatsSubPageMenu />} subPage={true} />;
};
export default ViewProvidersStatsPage;
