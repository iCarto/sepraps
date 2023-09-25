import {useNavigate} from "react-router-dom";
import {SectionSubheading} from "base/ui/section/components";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const LatestContractsList = ({contracts}) => {
    const navigate = useNavigate();

    const contractButtonStyle = {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        border: 1,
        borderColor: "primary.main",
        borderRadius: "4px",
        boxShadow: 1,
        "&:hover": {
            backgroundColor: "primary.hover",
        },
    };

    return (
        <Card variant="outlined">
            <CardHeader
                title={<SectionSubheading heading="Contratos" />}
                sx={{pb: 0}}
            />
            <List
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: {xs: "wrap", md: "noWrap"},
                    p: 1,
                    pt: 0,
                }}
            >
                {contracts.map((contract, index) => (
                    <ListItem key={index} sx={{pt: {xs: 1, xl: 0}, px: 1}}>
                        <ListItemButton
                            sx={contractButtonStyle}
                            onClick={() => {
                                navigate(`contracts/list/${contract.id}`);
                            }}
                        >
                            <ListItemText
                                primary={contract.number}
                                secondary={contract.financing_program?.financing_funds
                                    .map(financing_fund => financing_fund.short_name)
                                    .join(", ")}
                                secondaryTypographyProps={{textAlign: "center"}}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default LatestContractsList;
