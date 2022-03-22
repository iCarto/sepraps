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
    contact = null,
    showIsStaff = true,
    onOpenRemoveDialog = null,
}) => {
    // TO-DO: sectionName MAY NOT BE NECESSARY IF WE USE THE DATA IN CONTACT. WATCH OUT FOR EMPTY/NON-EXISTING CONTACTS

    const navigate = useNavigate();

    let isStaff = contact?.staff ? "Sí" : "No";
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

    const sectionNameForPath = sectionName
        .toLowerCase()
        .replace(/ de /g, " ")
        .replace(/ /g, "_");

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                // TO-DO UPDATE PATH
                navigate(`${sectionNameForPath}/existing/edit`);
            }}
        />,
        <SectionCardHeaderAction
            key="remove"
            name="remove"
            text="Quitar"
            icon={<LinkOffIcon />}
            onClick={() => {
                onOpenRemoveDialog(true, contact.role);
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
                            basePath={sectionNameForPath}
                            btnName={`Asignar ${sectionName}`}
                        />
                    </Grid>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractMonitoringContactSection;
