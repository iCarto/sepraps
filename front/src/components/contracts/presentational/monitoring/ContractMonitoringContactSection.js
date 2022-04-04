import {useNavigate} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {AddContactButtonGroup} from "components/contacts/presentational";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const ContractMonitoringContactSection = ({
    sectionName,
    postName,
    contact = null,
    showIsStaff = true,
    onOpenRemoveDialog = null,
}) => {
    const navigate = useNavigate();

    let isStaff = contact?.is_staff ? "Sí" : "No";
    let genderValue;

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

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                // TO-DO UPDATE PATH
                navigate(`${postName}/existing/edit`);
            }}
        />,
        <SectionCardHeaderAction
            key="remove"
            name="remove"
            text="Quitar"
            icon={<LinkOffIcon />}
            onClick={() => {
                onOpenRemoveDialog(true, sectionName);
            }}
        />,
    ];

    return (
        <SectionCard
            title={sectionName}
            secondaryActions={contact ? secondaryActions : []}
        >
            {contact ? (
                <>
                    <SectionField label="Nombre:" value={contact.name} />
                    <SectionField label="Género:" value={genderValue} />
                    {showIsStaff && (
                        <SectionField label="Personal interno:" value={isStaff} />
                    )}
                    {contact.comments && (
                        <SectionField label="Observaciones:" value={contact.comments} />
                    )}
                    <SectionField />
                    <SectionField
                        label="Celular:"
                        value={contact.phone}
                        labelIcon={PhoneAndroidIcon}
                    />
                    <SectionField
                        label="Correo electrónico:"
                        value={contact.email}
                        labelIcon={EmailIcon}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography p={6} sx={{fontStyle: "italic"}}>
                        Este contrato aún no tiene ningún {sectionName} asignado
                    </Typography>
                    <Grid item container xs={12} mt={3} justifyContent="center">
                        <AddContactButtonGroup
                            basePath={postName}
                            btnName={`Asignar ${sectionName}`}
                        />
                    </Grid>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractMonitoringContactSection;
