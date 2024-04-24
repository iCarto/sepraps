import {ModuleLayout} from "base/ui/module/components";
import {ModuleConfigProvider} from "base/ui/module/provider";
import {ProviderPageMenu} from "provider/menu";

const ProvidersModule = () => {
    return (
        <ModuleConfigProvider>
            <ModuleLayout title="Prestadores" menu={<ProviderPageMenu />} />
        </ModuleConfigProvider>
    );
};

export default ProvidersModule;
