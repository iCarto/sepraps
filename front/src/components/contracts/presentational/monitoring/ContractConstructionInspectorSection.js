import {SectionCard, SectionField} from "components/common/presentational";
import {AddContactButtonGroup} from "components/contacts/presentational";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContractConstructionInspectorSection = ({
    isSidePanelOpen = null,
    contact = null,
    secondaryActions = null,
}) => {
    let genderValue;
    let isStaff = contact?.staff ? "Sí" : "No";

    switch (`${contact?.gender}`) {
        case "F":
            genderValue = "Mujer";
            break;
        case "M":
            genderValue = "Hombre";
            break;
        default:
            genderValue = null;
            break;
    }

    return (
        <SectionCard
            title="Fiscal constructivo"
            secondaryActions={contact ? secondaryActions : []}
            isSidePanelOpen={isSidePanelOpen}
        >
            {contact ? (
                <>
                    <SectionField label="Nombre:" value={contact.name} />
                    <SectionField label="Género:" value={genderValue} />
                    <SectionField label="Celular:" value={contact.phone} />
                    <SectionField label="Correo electrónico:" value={contact.email} />
                    <SectionField label="Personal interno:" value={isStaff} />
                    <SectionField label="Observaciones:" value={contact.comments} />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography p={6} sx={{fontStyle: "italic"}}>
                        Este contrato aún no tiene un fiscal constructivo asignado
                    </Typography>
                    <Grid item container xs={12} mt={3} justifyContent="center">
                        <AddContactButtonGroup
                            basePath="construction-inspector"
                            btnName="Asignar fiscal constructivo"
                        />
                    </Grid>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractConstructionInspectorSection;
