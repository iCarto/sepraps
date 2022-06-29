import {useNavigate} from "react-router-dom";
import {AuthAction, useAuth} from "auth";

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
    postName,
    sectionName,
    contact = null,
    showIsStaff = true,
    onOpenRemoveDialog = null,
}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    let isStaff = contact?.is_staff ? "Sí" : "No";

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate(`${sectionName}/${contact.id}/edit`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
        <SectionCardHeaderAction
            key="remove"
            name="remove"
            text="Quitar"
            icon={<LinkOffIcon />}
            onClick={() => {
                onOpenRemoveDialog(true, sectionName, postName);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
    ];

    return (
        <SectionCard
            title={postName}
            secondaryActions={contact ? secondaryActions : []}
        >
            {contact ? (
                <>
                    <SectionField label="Nombre:" value={contact.name} />
                    <SectionField label="Género:" value={contact.gender} />
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
                        label="E-mail:"
                        value={contact.email}
                        labelIcon={EmailIcon}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography p={6} sx={{fontStyle: "italic"}}>
                        {postName === "Residente de obra"
                            ? `Este contrato aún no tiene ${postName.toLowerCase()}`
                            : `Este contrato aún no tiene responsable de ${postName.toLowerCase()}`}
                    </Typography>
                    <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT]}>
                        <Grid item container xs={12} mt={3} justifyContent="center">
                            <AddContactButtonGroup
                                basePath={sectionName}
                                btnName={`Asignar ${postName}`}
                            />
                        </Grid>
                    </AuthAction>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractMonitoringContactSection;
