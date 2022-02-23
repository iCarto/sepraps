import {useNavigate} from "react-router-dom";

import {DateUtil} from "utilities";
import {ButtonLink, SectionCard, SectionField} from "components/common/presentational";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ProjectContractSection = ({contract, hideLinkToContract = false}) => {
    const navigate = useNavigate();

    return (
        <SectionCard title="Contrato de obras">
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
                    {!hideLinkToContract && (
                        <ButtonLink
                            text="Ver contrato"
                            to={"/contracts/" + contract.id}
                        />
                    )}
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
