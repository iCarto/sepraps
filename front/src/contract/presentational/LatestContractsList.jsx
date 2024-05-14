import {useNavigate} from "react-router-dom";

import {theme} from "Theme";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const LatestContractsList = ({contracts}) => {
    const navigate = useNavigate();

    const contractButtonStyle = {
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: "primary.main",
        borderRadius: "4px",
        boxShadow: 1,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    };

    return (
        <ContainerGridWithBorder p={4}>
            <LightHeading>Últimos contratos modificados</LightHeading>
            <List
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: {xs: "wrap", md: "noWrap"},
                    width: "100%",
                    px: 0,
                    pb: 0,
                }}
            >
                {contracts.map((contract, index) => (
                    <ListItem key={index} sx={{pr: 0, pb: 0, pl: index === 0 ? 0 : 2}}>
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
                                primaryTypographyProps={{textAlign: "center"}}
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
        </ContainerGridWithBorder>
    );
};

export default LatestContractsList;
