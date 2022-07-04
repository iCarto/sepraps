import {SectionCard, SectionField} from "components/common/presentational";

const ContactSection = ({contact}) => {
    return (
        <SectionCard title="Contacto">
            <SectionField label="Nombre:" value={contact.name} />
            <SectionField label="Género:" value={contact.gender} />
            <SectionField label="Celular:" value={contact.phone} />
            <SectionField label="Correo electrónico:" value={contact.email} />
            <SectionField label="Observaciones:" value={contact.comments} />
        </SectionCard>
    );
};

export default ContactSection;
