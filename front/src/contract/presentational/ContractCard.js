import {useContractCard} from "contract/data";
import {ContractServiceChips} from ".";
import {EntityCard} from "base/entity/components/presentational";

const ContractCard = ({entity: contract, onClick = null}) => {
    const {cardFields} = useContractCard();

    const serviceChips = (
        <ContractServiceChips serviceLabels={contract.services_label} />
    );

    return (
        <EntityCard
            entity={contract}
            entityFields={cardFields}
            secondaryContent={serviceChips}
            onClick={onClick}
        />
    );
};

export default ContractCard;
