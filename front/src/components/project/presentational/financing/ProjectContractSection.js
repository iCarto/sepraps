import {useNavigate} from "react-router-dom";

import {DateUtil} from "utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import LaunchIcon from "@mui/icons-material/Launch";

const ProjectContractSection = ({contract, hideLinkToContract = false}) => {
    const navigate = useNavigate();

    const headerActions = [
        <SectionCardHeaderAction
            name="go-to-location-subpage"
            title="Ir a la página de Ubicación"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`/contracts/${contract.id}`);
            }}
        />,
    ];

    return (
        <SectionCard title="Contrato de obras" headerActions={headerActions}>
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
                        value={contract.awarding_budget}
                    />
                </>
            ) : (
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontStyle: "italic",
                                mb: {xs: 0, sm: 1.5},
                                textAlign: "center",
                            }}
                        >
                            Todavía no hay ningún contrato asociado a este proyecto.
                        </Typography>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            navigate("contract/new/add");
                        }}
                    >
                        Asociar contrato
                    </Button>
                </Grid>
            )}
        </SectionCard>
    );
};

export default ProjectContractSection;
