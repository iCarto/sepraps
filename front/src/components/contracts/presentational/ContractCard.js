import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const ContractCard = ({contract}) => {
    console.log(contract);
    return (
        <Grid item component="li" xs={12} sm={6} md={4} xl={2}>
            <Link href={`/contracts/${contract.id}`} underline="none" color="inherit">
                <Card id={contract.id}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {contract.number}
                            <Typography variant="body2">
                                {contract.bid_request_number}
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
};

export default ContractCard;
