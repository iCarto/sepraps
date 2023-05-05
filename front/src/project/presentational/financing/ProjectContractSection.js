import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";

import {DateUtil, NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/section/utilities";

import {AddNewButton} from "base/shared/components";
import {SectionCard, SectionField} from "base/section/components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProjectContractSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        // <SectionCardHeaderAction
        //     key="edit"
        //     name="edit"
        //     text="Modificar"
        //     icon={<EditIcon />}
        //     onClick={() => {
        //         navigate("contract/edit");
        //     }}
        //     roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        // />,
    ];

    return (
        <SectionCard title="Contrato de obras" secondaryActions={secondaryActions}>
            {contract ? (
                <>
                    <SectionField
                        label="Número de contrato"
                        value={contract.number}
                        linkPath={`/contracts/${contract.id}/summary`}
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
                    <AddNewButton
                        basePath="contract/new/add"
                        roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                    />
                </Stack>
            )}
        </SectionCard>
    );
};

export default ProjectContractSection;
