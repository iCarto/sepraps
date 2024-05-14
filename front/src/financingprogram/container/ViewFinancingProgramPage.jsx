import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {FinancingProgramService} from "financingprogram/service";
import {useConfigModule} from "base/ui/module/provider";

import {PageLayout} from "base/ui/main";
import {FinancingProgramSubPageMenu} from "financingprogram/menu";

const ViewFinancingProgramPage = () => {
    const {id} = useParams();
    const [financingprogram, setFinancingProgram] = useState(null);
    const location = useLocation();

    const {addToModuleFilter, setModuleBasePath} = useConfigModule();

    useEffect(() => {
        setFinancingProgram(null);
        setModuleBasePath(`/financingprograms/list/${id}`);
        FinancingProgramService.get(id).then(data => {
            addToModuleFilter({financingprogram: data.id});
            setFinancingProgram(data);
        });
    }, [id, location.state?.lastRefreshDate]);

    return (
        financingprogram && (
            <PageLayout
                menu={
                    <FinancingProgramSubPageMenu financingProgram={financingprogram} />
                }
                context={[financingprogram]}
                subPage={true}
            />
        )
    );
};
export default ViewFinancingProgramPage;
