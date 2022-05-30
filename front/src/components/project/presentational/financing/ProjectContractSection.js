import {useNavigate} from "react-router-dom";
import {useAuth} from "auth";

import {DateUtil, NumberUtil} from "utilities";
import {SectionCard, SectionField} from "components/common/presentational";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProjectContractSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    return (
        <SectionCard title="Contrato de obras">
            {contract ? (
                <>
                    <SectionField
                        label="Número de contrato:"
                        value={contract.number}
                        linkPath={`/contracts/${contract.id}/summary`}
                    />
                    <SectionField
                        label="Número de licitación:"
                        value={contract.bid_request_number}
                    />
                    <SectionField
                        label="Fecha de firma del contrato:"
                        value={DateUtil.formatDate(contract.execution_signature_date)}
                    />
                    <SectionField
                        label="Plazo previsto de ejecución del contrato:"
                        value={
                            contract.expected_execution_period &&
                            `${
                                contract.expected_execution_period
                            } días (hasta el ${DateUtil.formatDate(
                                contract.expected_execution_end_date
                            )})`
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
