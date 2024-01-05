import {DateUtil} from "base/format/utilities";
import {SectionCard, SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";

const EntityAuditSection = ({entity}) => {
    return (
        <SectionCard title="Datos de auditoría">
            <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                    <SectionField
                        label="Fecha de creación"
                        value={DateUtil.formatDateTime(entity.created_at)}
                    />
                    <SectionField label="Creado por" value={entity.created_by} />
                </Grid>
                <Grid item xs={6}>
                    <SectionField
                        label="Fecha de última modificación"
                        value={DateUtil.formatDateTime(entity.updated_at)}
                    />
                    {entity.updated_by ? (
                        <SectionField
                            label="Modificado por"
                            value={entity.updated_by}
                        />
                    ) : null}
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default EntityAuditSection;
