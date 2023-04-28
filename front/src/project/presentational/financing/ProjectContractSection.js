import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";

import {DateUtil, NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/section/utilities";
import {SectionCard, SectionField} from "base/section/components";
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
                    {FieldUtil.getSectionField(
                        "Fecha de firma del contrato",
                        DateUtil.formatDate(contract.execution_signature_date)
                    )}
                    {FieldUtil.getSectionField(
                        "Plazo previsto de ejecución del contrato",
                        contract.expected_execution_period &&
                            `${
                                contract.expected_execution_period
                            } días (hasta el ${DateUtil.formatDate(
                                contract.expected_execution_end_date
                            )})`
                    )}
                    {FieldUtil.getSectionField(
                        "Contratista",
                        contract.contractor?.name
                    )}
                    {FieldUtil.getSectionField(
                        "Monto adjudicado",
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
