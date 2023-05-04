import {useNavigate} from "react-router-dom";
import {useAuth} from "base/user/provider";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/section/components";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import {AddNewButton} from "base/shared/components";

const ContractFinancingProgramSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("financing_program/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard title="Financiación" secondaryActions={secondaryActions}>
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
                        El contrato aún no tiene programa de financiación asignado
                    </Typography>
                    <AddNewButton basePath="financing_program/edit" />
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractFinancingProgramSection;
