import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {ContactService} from "contact/service";
import {EntityViewPanel} from "base/entity/components/presentational";
import {SectionCard, SectionField} from "base/ui/section/components";
import {NumberUtil} from "base/format/utilities";

const ViewProviderContactPanel = () => {
    const {contactId} = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        ContactService.get(contactId).then(contact => {
            setContact(contact);
        });
    }, [contactId]);

    return (
        contact && (
            <EntityViewPanel title="Contacto del prestador" showDetailButton={false}>
                <SectionCard title={contact.name}>
                    <SectionField label="Cargo" value={contact.post} />
                    <SectionField label="Género" value={contact.gender_name} />
                    <SectionField
                        label="Nº CI"
                        value={NumberUtil.formatInteger(contact.ci_number)}
                    />
                    <SectionField label="Celular" value={contact.phone} />
                    <SectionField label="E-mail" value={contact.email} />
                    <SectionField label="Observaciones" value={contact.comments} />
                </SectionCard>
            </EntityViewPanel>
        )
    );
};

export default ViewProviderContactPanel;
