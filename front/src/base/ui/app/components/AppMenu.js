import {NAVBAR_HEIGHT} from "../config/measurements";

import {AppMenuItem} from ".";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";

const AppMenu = ({children = null, menuItems = []}) => {
    const leftSideItems = menuItems.map((menuItem, index) => (
        <AppMenuItem
            key={index}
            text={menuItem.name}
            to={menuItem.to}
            resolvedPathName={menuItem.pathname}
            resolvedSecondPathName={menuItem.second_pathname || menuItem.pathname}
        />
    ));

    return (
        <Grid component="nav" container height={`${NAVBAR_HEIGHT}px`}>
            <MenuList
                sx={{
                    display: "flex",
                    direction: "row",
                    width: "100%",
                    p: 0,
                    borderTop: "1px solid #fff",
                }}
            >
                {leftSideItems}
                {children}
            </MenuList>
        </Grid>
    );
};

export default AppMenu;
