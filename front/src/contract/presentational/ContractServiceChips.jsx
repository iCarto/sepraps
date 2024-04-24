import Grid from "@mui/material/Grid";
import {ContractServiceChip} from ".";

const ContractServiceChips = ({serviceLabels}) => {
    return serviceLabels.length ? (
        <Grid container>
            {serviceLabels.split(",").map((service, index) => (
                <Grid key={index} item sx={{pr: 1, pb: 1}}>
                    <ContractServiceChip service={service.trim()} />
                </Grid>
            ))}
        </Grid>
    ) : null;
};

export default ContractServiceChips;
