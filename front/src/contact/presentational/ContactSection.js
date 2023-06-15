import {SectionCard, SectionField} from "base/ui/section/components";

const ContactSection = ({contact}) => {
    return (
        <SectionCard title="Contacto">
            <SectionField label="Nombre" value={contact.name} />
            <SectionField label="Género" value={contact.gender_name} />
            <SectionField label="Nº CI" value={contact.ci_number} />
            <SectionField label="Celular" value={contact.phone} />
            <SectionField label="E-mail" value={contact.email} />
            <SectionField label="Observaciones" value={contact.comments} />
        </SectionCard>
    );
};

export default ContactSection;
