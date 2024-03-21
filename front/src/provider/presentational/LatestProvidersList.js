import {useNavigate} from "react-router-dom";

import {theme} from "Theme";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const LatestProvidersList = ({providers}) => {
    const navigate = useNavigate();

    const providerButtonStyle = {
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: "primary.main",
        borderRadius: "4px",
        boxShadow: 1,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
        textWrap: "balance",
    };

    return (
        <ContainerGridWithBorder p={4}>
            <LightHeading>Últimos prestadores modificados</LightHeading>
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
                {providers.map((provider, index) => (
                    <ListItem key={index} sx={{pr: 0, pb: 0, pl: index === 0 ? 0 : 2}}>
                        <ListItemButton
                            sx={providerButtonStyle}
                            onClick={() => {
                                navigate(`providers/list/${provider.id}`);
                            }}
                        >
                            <ListItemText
                                primary={provider.name}
                                primaryTypographyProps={{
                                    variant: "subtitle2",
                                    textAlign: "center",
                                }}
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

export default LatestProvidersList;
