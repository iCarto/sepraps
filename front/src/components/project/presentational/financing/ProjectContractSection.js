import {useNavigate} from "react-router-dom";
import {AuthAction, useAuth} from "auth";

import {DateUtil, NumberUtil} from "utilities";
import {SectionCard, SectionField} from "components/common/presentational";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProjectContractSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const getValueInfo = (label, value) => {
        if (value) {
            return <SectionField label={label} value={value} />;
        } else
            return (
                <SectionField label={label} value="Pendiente" valueFontStyle="italic" />
            );
    };

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
                    {getValueInfo(
                        "Fecha de firma del contrato:",
                        DateUtil.formatDate(contract.execution_signature_date)
                    )}
                    {getValueInfo(
                        "Plazo previsto de ejecución del contrato:",
                        contract.expected_execution_period &&
                            `${
                                contract.expected_execution_period
                            } días (hasta el ${DateUtil.formatDate(
                                contract.expected_execution_end_date
                            )})`
                    )}
                    {getValueInfo("Contratista:", contract.contractor?.name)}
                    {getValueInfo(
                        "Monto adjudicado:",
                        NumberUtil.formatCurrency(contract.awarding_budget)
                    )}
                </>
            ) : (
                <Stack alignItems="center">
                    <Typography p={6} sx={{fontStyle: "italic"}}>
                        Este proyecto aún no ha sido asignado a ningún contrato
                    </Typography>
                    <AuthAction roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                navigate("contract/new/add");
                            }}
                        >
                            Asignar
                        </Button>
                    </AuthAction>
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectContractSection;
