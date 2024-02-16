import {SectionCard} from "base/ui/section/components";
import {ViewContactsList} from "contact/container";
import {ProviderContactService} from "provider/service";

const ProviderContactsSection = ({provider}) => {
    return (
        <SectionCard title="Plantel">
            <ViewContactsList
                service={ProviderContactService}
                basePath={""}
                entityId={provider.id}
                entityName="contrato"
            />
        </SectionCard>
    );
};

export default ProviderContactsSection;
