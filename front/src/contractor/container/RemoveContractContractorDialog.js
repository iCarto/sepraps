import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";
import {DialogLayout} from "base/shared/components";
import {useNavigateWithReload} from "base/navigation/hooks";

const RemoveContractContractorDialog = ({contract, isDialogOpen, setIsDialogOpen}) => {
    const navigate = useNavigateWithReload();

    const handleDialog = isOpen => {
        setIsDialogOpen(isOpen);
    };

    const handleConfirmRemoval = () => {
        setIsDialogOpen(false);
        ContractService.updateContract(
            contract_view_adapter({...contract, contractor: null})
        ).then(() => {
            navigate("/contracts/" + contract.id + "/summary", true);
        });
    };

    return (
        <DialogLayout
            dialogLabel="Remove contractor"
            dialogTitle="¿Quiere quitar este contratista del contrato?"
            dialogContentText="Si hace clic en Quitar, el contrato ya no tendrá un contratista asociado."
            mainActionClick={handleConfirmRemoval}
            mainActionText="Quitar"
            handleDialog={handleDialog}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveContractContractorDialog;
