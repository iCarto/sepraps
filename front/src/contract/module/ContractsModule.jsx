import {ModuleLayout} from "base/ui/module/components";
import {ModuleConfigProvider} from "base/ui/module/provider";
import {ContractPageMenu} from "contract/menu";

const ContractsModule = () => {
    return (
        <ModuleConfigProvider>
            <ModuleLayout title="Contratos" menu={<ContractPageMenu />} />
        </ModuleConfigProvider>
    );
};

export default ContractsModule;
