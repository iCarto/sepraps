import {ModuleLayout} from "base/ui/module/components";
import {ModuleConfigProvider} from "base/ui/module/provider";
import {StatsPageMenu} from "stats/presentational";

const StatsModule = () => {
    return (
        <ModuleConfigProvider>
            <ModuleLayout title="Resultados" menu={<StatsPageMenu />} />
        </ModuleConfigProvider>
    );
};

export default StatsModule;
