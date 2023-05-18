import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

const EntityAuditSection = ({entity}) => {
    return (
        <SectionCard title="Datos de auditoría">
            <SectionField
                label="Fecha de creación"
                value={DateUtil.formatDate(entity.created_at)}
            />
            <SectionField label="Creado por" value={entity.created_by} />
            <SectionField
                label="Fecha de última modificación"
                value={DateUtil.formatDate(entity.updated_at)}
            />
            <SectionField label="Modificado por" value={entity.updated_by} />
        </SectionCard>
    );
};

export default EntityAuditSection;
