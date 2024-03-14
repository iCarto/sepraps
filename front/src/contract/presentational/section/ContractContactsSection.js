import {ContractContactService} from "contract/service";
import {ViewContactsList} from "contact/container";
import {SectionCard} from "base/ui/section/components";

const ContractContactsSection = ({
    contractId,
    area = null,
    title = "Plantel",
    hideActions = false,
}) => {
    return (
        <SectionCard title={title}>
            <ViewContactsList
                service={ContractContactService}
                basePath={""}
                entityId={contractId}
                entityName="contrato"
                filter={{area: area}}
                hideActions={hideActions}
            />
        </SectionCard>
    );
};

export default ContractContactsSection;
