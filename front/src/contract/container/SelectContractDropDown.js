import {useState} from "react";
import {useOutletContext, useLocation, useParams} from "react-router-dom";

import {DropdownMenuItemLink} from "base/ui/menu";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SelectContractDropDown = ({selectedContract}) => {
    const [anchorElement, setAnchorElement] = useState(null);

    let context;
    [context] = useOutletContext();
    const {filteredContracts} = context;

    let location = useLocation();
    const {id: currentContractId} = useParams();

    //TO-DO: Review:
    // We want to get the subpage url path segment only to navigate when changing contracts. Right now we need to implement this function because the questionnaires are placed in a two-level subpage: questionnaires/questionnaire_name and we need these 2 segments in order to display the page correctly.
    const getSubpagePathSegment = () => {
        const splitPath = location.pathname
            .substring(location.pathname.indexOf(currentContractId) + 1)
            .split("/");

        if (splitPath[1] === "questionnaires") {
            return splitPath[1] + "/" + splitPath[2];
        } else return splitPath[1];
    };

    const open = Boolean(anchorElement);

    const handleClick = event => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    return (
        <>
            <Button
                id="positioned-button"
                aria-controls="positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    pt: 3,
                    pb: 2,
                    px: 2.25,
                    color: "white",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <Box
                    sx={{
                        textAlign: "left",
                    }}
                >
                    <Typography
                        sx={{
                            pr: 6,
                            fontWeight: 800,
                            lineHeight: 1.25,
                        }}
                    >
                        {selectedContract && selectedContract.number}
                    </Typography>
                    <Typography
                        variant="overline"
                        sx={{
                            pt: 1.5,
                            lineHeight: 0,
                            fontWeight: 500,
                            letterSpacing: "0.5px",
                            color: "white",
                        }}
                    >
                        {selectedContract && selectedContract.bid_request_number}
                    </Typography>
                </Box>
            </Button>
            {filteredContracts.length > 0 && (
                <Menu
                    id="lock-menu"
                    anchorEl={anchorElement}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "lock-button",
                        role: "listbox",
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {filteredContracts.map(contract => (
                        <DropdownMenuItemLink
                            variant="menu"
                            key={contract.id}
                            id={contract.id}
                            to={`/contracts/${contract.id}/${getSubpagePathSegment()}`}
                            selected={contract === selectedContract.number}
                            onClick={handleClose}
                        >
                            <Stack>
                                <Typography>{contract.number}</Typography>
                                <Typography variant="caption" sx={{ml: 1}}>
                                    {contract.bid_request_number}
                                </Typography>
                            </Stack>
                        </DropdownMenuItemLink>
                    ))}
                </Menu>
            )}
        </>
    );
};

export default SelectContractDropDown;
