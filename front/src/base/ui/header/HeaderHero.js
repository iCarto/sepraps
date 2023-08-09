import {Fragment} from "react";
import {HERO_HEIGHT} from "../app/config/measurements";

import Grid from "@mui/material/Grid";

const HeaderHero = ({left = [], right = []}) => {
    return (
        <Grid
            container
            role="hero"
            minHeight={`${HERO_HEIGHT}px`}
            px={2}
            bgcolor="#eb2010"
        >
            <Grid item container xs={6} md={8} alignItems="center">
                {left.map((component, index) => (
                    <Fragment key={index}>{component}</Fragment>
                ))}
            </Grid>
            <Grid
                item
                container
                xs={6}
                md={4}
                alignItems="center"
                justifyContent="flex-end"
            >
                {right.map((component, index) => (
                    <Fragment key={index}>{component}</Fragment>
                ))}
            </Grid>
        </Grid>
    );
};

export default HeaderHero;
