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
        <Grid
            component="nav"
            container
            alignItems="center"
            sx={{
                borderTop: "1px solid #fff",
                minHeight: `${NAVBAR_HEIGHT}px`,
            }}
        >
            <Grid item xs={12} md={6}>
                <MenuList
                    sx={{
                        display: "flex",
                        direction: "row",
                        height: `100%`,
                        p: 0,
                        minHeight: `${NAVBAR_HEIGHT}px`,
                    }}
                >
                    {leftSideItems}
                </MenuList>
            </Grid>
            <Grid
                item
                container
                xs={12}
                md={6}
                justifyContent="flex-end"
                alignItems="center"
            >
                {children}
            </Grid>
        </Grid>
    );
};

export default AppMenu;
