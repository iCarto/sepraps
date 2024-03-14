import {SectionCard} from "base/ui/section/components";
import {ViewContactsList} from "contact/container";
import {ProviderContactService} from "provider/service";

const ProviderContactsSection = ({
    providerId,
    title = "Plantel",
    hideActions = false,
}) => {
    return (
        <SectionCard title={title}>
            <ViewContactsList
                service={ProviderContactService}
                basePath={""}
                entityId={providerId}
                entityName="contrato"
                hideActions={hideActions}
            />
        </SectionCard>
    );
};

export default ProviderContactsSection;
