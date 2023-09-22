import {useParams} from "react-router-dom";

import {ContactService} from "contact/service";
import {EntitySummaryPanel} from "base/entity/components/presentational";
import {SectionField} from "base/ui/section/components";
import {NumberUtil} from "base/format/utilities";

const ViewContactPanel = () => {
    const {contactId} = useParams();

    const getSectionData = contact => {
        return (
            <>
                <SectionField label="Cargo" value={contact.post} />
                <SectionField label="Género" value={contact.gender_name} />
                <SectionField
                    label="Nº CI"
                    value={NumberUtil.formatInteger(contact.ci_number)}
                />
                <SectionField label="Celular" value={contact.phone} />
                <SectionField label="E-mail" value={contact.email} />
                <SectionField label="Observaciones" value={contact.comments} />
            </>
        );
    };

    return (
        <EntitySummaryPanel
            service={ContactService}
            id={contactId}
            title="Contacto"
            getSectionTitle={contact => contact?.name}
            getSectionData={getSectionData}
            showClickDetailButton={contact => false}
        />
    );
};

export default ViewContactPanel;
