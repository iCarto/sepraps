import {GenericChip} from "base/shared/components";

const ContractServiceChip = ({service}) => {
    const getAvatarText = contractService => {
        switch (contractService) {
            case "Ejecución de obra":
                return "OB";
            case "Fiscalización de obra":
                return "FO";
            case "Fiscalización social":
                return "FS";
        }
    };

    return (
        <GenericChip
            avatarText={getAvatarText(service)}
            tooltipText={service}
            label={service}
        />
    );
};

export default ContractServiceChip;
