import {useNavigate} from "react-router-dom";

import {DateUtil} from "utilities";
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

    const headerActions = [
        <SectionCardHeaderAction
            key="go-to-location-subpage"
            name="go-to-location-subpage"
            text="Ir a la página del Contrato"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`/contracts/${contract.id}`);
            }}
        />,
    ];

    return (
        <SectionCard title="Contrato de obras" secondaryActions={headerActions}>
            {contract ? (
                <>
                    <SectionField label="Número de contrato:" value={contract.number} />
                    <SectionField
                        label="Número de licitación:"
                        value={contract.bid_request_number}
                    />
                    <SectionField
                        label="Fecha de licitación:"
                        value={DateUtil.formatDate(contract.bid_request_date)}
                    />
                    <SectionField
                        label="Fecha de adjudicación:"
                        value={DateUtil.formatDate(contract.awarding_date)}
                    />
                    <SectionField
                        label="Presupuesto adjudicado:"
                        value={
                            contract.awarding_budget && contract.awarding_budget + "$"
                        }
                    />
                </>
            ) : (
                <Stack alignItems="center" spacing={2}>
                    <Typography style={{fontStyle: "italic"}}>
                        El proyecto no tiene ningún contrato asignado
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
