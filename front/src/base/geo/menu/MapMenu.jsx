import Box from "@mui/material/Box";
import List from "@mui/material/List";
import styled from "@mui/material/styles/styled";

const MapMenuBox = styled(Box)(({theme}) => ({
    height: "100%",
    overflow: "auto",
    minWidth: "270px",
    backgroundColor: theme.palette.secondary.lighter,
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
    fontSize: "0.9rem",
    "& .MapMenuList": {
        widht: "100%",
        "& .LayerMenuListItem": {
            paddingTop: "5px",
            paddingBottom: "5px",
            "& .LayerMenuCheckbox": {
                transform: "scale(0.7)",
                padding: "0px",
            },
            "& .LayerMenuIcon": {
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
                marginRight: "5px",
                backgroundColor: "white",
                border: `1px solid ${theme.palette.secondary.light}`,
                borderRadius: "5px",
            },
            "& .MuiListItemSecondaryAction-root": {
                "& .MuiSvgIcon-root": {
                    transform: "scale(0.7)",
                },
            },
        },
        "& .LayerMenuDiscriminatorInfo": {
            marginLeft: "35px",
            marginRight: "50px",
            paddingTop: "0px",
            paddingBottom: "5px",
            color: "#aaa",
            backgroundColor: "white",
            border: `1px solid ${theme.palette.secondary.light}`,
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            "& .LayerMenuDiscriminatorInfoHeader": {
                lineHeight: "20px",
                fontWeight: "normal",
                fontStyle: "italic",
                fontSize: "0.8rem",
            },
            "& .LayerMenuLegendItem": {
                height: "25px",
                paddingLeft: "10px",
                fontSize: "0.8rem",
                "& .LayerMenuLegendItemButton": {
                    transform: "scale(0.7)",
                    color: "#aaa",
                    padding: "0px",
                },
                "& .LayerMenuLegendItemIcon": {
                    width: "30px",
                    display: "flex",
                    justifyContent: "center",
                    transform: "scale(0.6)",
                },
                "& .LayerMenuLegendItemText": {
                    "& .MuiTypography-root": {
                        fontSize: "0.7rem",
                    },
                },
            },
        },
    },
}));

const MapMenu = ({children}) => {
    return (
        <MapMenuBox>
            <List className="MapMenuList">{children}</List>
        </MapMenuBox>
    );
};

export default MapMenu;
