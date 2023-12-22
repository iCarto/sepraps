import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";

const EntityAuditSection = ({entity}) => {
    return (
        <SectionCard title="Datos de auditoría">
            <SectionField
                label="Fecha de creación"
                value={DateUtil.formatDateTime(entity.created_at)}
            />
            <SectionField label="Creado por" value={entity.created_by} />
            <SectionField
                label="Fecha de última modificación"
                value={DateUtil.formatDateTime(entity.updated_at)}
            />
            {entity.updated_by ? (
                <SectionField label="Modificado por" value={entity.updated_by} />
            ) : null}
        </SectionCard>
    );
};

export default EntityAuditSection;
