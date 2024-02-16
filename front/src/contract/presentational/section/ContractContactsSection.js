import {ContractContactService} from "contract/service";
import {ViewContactsList} from "contact/container";
import {SectionCard} from "base/ui/section/components";

const ContractContactsSection = ({contract, area = null}) => {
    return (
        <SectionCard title="Plantel">
            <ViewContactsList
                service={ContractContactService}
                basePath={""}
                entityId={contract.id}
                entityName="contrato"
                filter={{area: area}}
            />
        </SectionCard>
    );
};

export default ContractContactsSection;
