import {EntityCard} from "base/entity/components";
import {useContractCard} from "contract/data";

const ContractCard = ({entity: contract, onClick = null}) => {
    const {cardFields} = useContractCard();

    return <EntityCard entity={contract} entityFields={cardFields} onClick={onClick} />;
};

export default ContractCard;
