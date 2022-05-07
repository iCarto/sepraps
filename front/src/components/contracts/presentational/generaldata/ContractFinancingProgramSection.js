import {useOutletContext, useNavigate} from "react-router-dom";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ContractFinancingProgramSection = ({isSidePanelOpen = null}) => {
    const navigate = useNavigate();

    let contract;
    [contract] = useOutletContext();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("financing_program/edit");
            }}
        />,
    ];

    return (
        <SectionCard
            title="Programa de financiación"
            secondaryActions={secondaryActions}
            isSidePanelOpen={isSidePanelOpen}
        >
            {contract.financing_program ? (
                <>
                    <SectionField
                        label="Programa:"
                        value={contract.financing_program.name}
                    />
                    <SectionField
                        label="Financiador/es:"
                        value={contract.financing_program.financing_funds
                            .map(financing_fund => financing_fund.name)
                            .join(", ")}
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography style={{fontStyle: "italic"}}>
                        El contrato aún no tiene programa de financiación asignado
                    </Typography>
                    {/*<AddContractorButtonGroup />*/}
                </Stack>
            )}
        </SectionCard>
    );
};

export default ContractFinancingProgramSection;
