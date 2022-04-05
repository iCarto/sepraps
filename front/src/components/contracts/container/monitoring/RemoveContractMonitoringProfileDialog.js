import {ContractService} from "service/api";
import {contract_view_adapter} from "model";
import {useNavigateWithReload} from "hooks";

import {DialogLayout} from "components/common/presentational";

const RemoveContractMonitoringProfileDialog = ({
    contract = null,
    profileToRemove,
    postName,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const navigate = useNavigateWithReload();

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        setIsDialogOpen(false);
        ContractService.updateContract(
            contract_view_adapter({...contract, [profileToRemove]: null})
        ).then(() => {
            navigate("/contracts/" + contract.id + "/monitoring", true);
        });
    };

    return (
        <DialogLayout
            dialogLabel="Remove monitoring profile data"
            dialogTitle={`Quiere quitar este ${postName.toLowerCase()} del contrato?`}
            dialogContentText={`Si hace clic en Quitar, este ${postName.toLowerCase()} se eliminará del contrato.`}
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveContractMonitoringProfileDialog;
