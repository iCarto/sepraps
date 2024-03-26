import {ModuleLayout} from "base/ui/module/components";
import {ModuleConfigProvider} from "base/ui/module/provider";
import {FinancingProgramPageMenu} from "financingprogram/menu";

const FinancingProgramsModule = () => {
    return (
        <ModuleConfigProvider>
            <ModuleLayout
                title="Programas de financiación"
                menu={<FinancingProgramPageMenu />}
            />
        </ModuleConfigProvider>
    );
};

export default FinancingProgramsModule;
