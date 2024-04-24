import {useState} from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {availableBaseLayers} from ".";
import {useMapConfig} from "./provider";

const BaseLayerSelector = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openBaseLayerMenu = Boolean(anchorEl);

    const {selectedBaseLayer, setSelectedBaseLayer} = useMapConfig();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeBaseLayer = baseLayer => {
        setSelectedBaseLayer(baseLayer);
        handleClose();
    };

    return (
        <Box>
            <Tooltip title="Capa base">
                <Stack direction="row" alignItems="center">
                    <IconButton
                        aria-label="select-base-layer"
                        onClick={handleClick}
                        color="primary"
                    >
                        <LayersOutlinedIcon />
                    </IconButton>
                </Stack>
            </Tooltip>
            <Menu
                id="base-layer-menu"
                anchorEl={anchorEl}
                open={openBaseLayerMenu}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "base-layer-button",
                }}
            >
                <MenuItem
                    sx={{
                        ml: 1,
                        py: 0,
                        "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent",
                        },
                    }}
                    disableRipple
                >
                    <FormControl>
                        <FormLabel id="base-layer-group-label" sx={{pb: 1}}>
                            Capa base
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="base-layer-group-label"
                            name="base-layer-radio-buttons-group"
                        >
                            {availableBaseLayers.map(availableBaseLayer => (
                                <FormControlLabel
                                    checked={
                                        availableBaseLayer.code ===
                                        selectedBaseLayer.code
                                    }
                                    control={<Radio />}
                                    label={availableBaseLayer.name}
                                    onClick={() =>
                                        handleChangeBaseLayer(availableBaseLayer)
                                    }
                                    key={availableBaseLayer.code}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default BaseLayerSelector;
