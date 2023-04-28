import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";

import {SidebarPanel} from "base/ui/sidebar";
import {ContractForm} from "contract/presentational/form";
import {AlertError} from "base/error/components";

const UpdateContractPanel = () => {
    const {section} = useParams();

    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let contract;
    [contract] = useOutletContext();

    const path =
        section === "generaldata" || section === "financing_program"
            ? `/contracts/${contract.id}/summary`
            : `/contracts/${contract.id}/phases`;

    const handleSubmit = contract => {
        ContractService.updateContract(contract_view_adapter({...contract}))
            .then(() => {
                navigate(path, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        console.log("clic");
        navigate(path);
    };

    return (
        <SidebarPanel
            sidebarTitle="Modificar contrato"
            closeSidebarClick={handleCloseSidebar}
        >
            <AlertError error={error} />
            <ContractForm updatedSection={section} onSubmit={handleSubmit} />
        </SidebarPanel>
    );
};

export default UpdateContractPanel;
