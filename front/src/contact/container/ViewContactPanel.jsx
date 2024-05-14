import {EntitySummaryPanel} from "base/entity/components/presentational";
import {SectionField} from "base/ui/section/components";
import {NumberUtil} from "base/format/utilities";

const ViewContactPanel = ({service, id}) => {
    const getSectionData = contact => {
        return (
            <>
                <SectionField label="Cargo" value={contact.post_label} />
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
            service={service}
            id={id}
            title="Contacto"
            getSectionTitle={contact => contact?.name}
            getSectionData={getSectionData}
            showClickDetailButton={contact => false}
        />
    );
};

export default ViewContactPanel;
