import {useOutletContext} from "react-router-dom";
import {useAuth} from "base/user/provider";

import {DateUtil, NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";

import {AddNewButton} from "base/shared/components";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProjectContractSection = ({contract}) => {
    const {ROLES} = useAuth();

    let project;
    [project] = useOutletContext();
    const isProjectClosed = project?.closed;

    return (
        <SectionCard title="Contrato de obras">
            {contract ? (
                <>
                    <SectionField
                        label="Número de contrato"
                        value={contract.number}
                        linkPath={`/contracts/list/${contract.id}/summary`}
                    />
                    <SectionField
                        label="Número de licitación"
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
                <Stack alignItems="center" spacing={3}>
                    <Typography sx={{fontStyle: "italic"}}>
                        Este proyecto aún no ha sido asignado a ningún contrato
                    </Typography>
                    {isProjectClosed ? null : (
                        <AddNewButton
                            basePath="contract/new/add"
                            roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                        />
                    )}
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectContractSection;
