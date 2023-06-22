import {ModuleLayout} from "base/ui/module/components";
import {ModuleConfigProvider} from "base/ui/module/provider";
import {FieldReportPageMenu} from "fieldReport/menu";

const FieldReportsModule = () => {
    return (
        <ModuleConfigProvider>
            <ModuleLayout title="Informes de viaje" menu={<FieldReportPageMenu />} />
        </ModuleConfigProvider>
    );
};

export default FieldReportsModule;
