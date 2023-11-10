import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {
    SectionBox,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";

import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {AddNewButton} from "base/shared/components";
import Grid from "@mui/material/Grid";

const ContractGeneralDataSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate(`generaldata/edit`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard title="Contrato" secondaryActions={secondaryActions}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SectionBox label="Datos del contrato">
                        <SectionField label="Número" value={contract?.number} />
                        <SectionField label="Descripción" value={contract?.comments} />
                        <SectionField
                            label="Servicios"
                            value={contract?.services_label}
                        />
                    </SectionBox>
                </Grid>
                <Grid item xs={6}>
                    <SectionBox label="Financiación">
                        {contract.financing_program ? (
                            <>
                                <SectionField
                                    label="Programa"
                                    value={contract?.financing_program?.name}
                                />
                                <SectionField
                                    label="Financiador/es"
                                    value={contract?.financing_program?.financing_funds
                                        .map(financing_fund => financing_fund.name)
                                        .join(", ")}
                                />
                            </>
                        ) : (
                            <Stack alignItems="center" spacing={3}>
                                <Typography sx={{fontStyle: "italic"}}>
                                    El contrato aún no tiene programa de financiación
                                    asignado
                                </Typography>
                                <AddNewButton basePath="financing_program/edit" />
                            </Stack>
                        )}
                    </SectionBox>
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ContractGeneralDataSection;
