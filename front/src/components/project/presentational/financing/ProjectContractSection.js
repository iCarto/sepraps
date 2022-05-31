import {useNavigate} from "react-router-dom";
import {useAuth} from "auth";

import {DateUtil, NumberUtil} from "utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LaunchIcon from "@mui/icons-material/Launch";

const ProjectContractSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const headerActions = [
        <SectionCardHeaderAction
            key="go-to-location-subpage"
            name="go-to-location-subpage"
            text="Ir a la página del Contrato"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`/contracts/${contract.id}/summary`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
    ];
    return (
        <SectionCard
            title="Contrato de obras"
            secondaryActions={contract ? headerActions : []}
        >
            {contract ? (
                <>
                    <SectionField label="Número de contrato:" value={contract.number} />
                    <SectionField
                        label="Número de licitación:"
                        value={contract.bid_request_number}
                    />
                    <SectionField
                        label="Fecha de firma del contrato:"
                        value={DateUtil.formatDate(contract.execution_signature_date)}
                    />
                    {/* TO-DO: AÑADIR FECHA AUTOCALCULADA */}
                    <SectionField
                        label="Plazo de ejecución del contrato:"
                        value={
                            contract.expected_execution_period +
                            " días (FECHA AUTOCALCULADA)"
                        }
                    />
                    <SectionField
                        label="Contratista:"
                        value={contract.contractor?.name}
                    />
                    <SectionField
                        label="Monto adjudicado:"
                        value={NumberUtil.formatCurrency(contract.awarding_budget)}
                    />
                </>
            ) : (
                <Stack alignItems="center">
                    <Typography p={6} sx={{fontStyle: "italic"}}>
                        Este proyecto aún no ha sido asignado a ningún contrato
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate("contract/new/add");
                        }}
                    >
                        Asignar
                    </Button>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectContractSection;
