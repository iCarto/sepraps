import {useState, useEffect} from "react";
import {ContractService, TEMPLATE} from "service/api";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {DropdownMenuItemLink} from "components/common/presentational";
import Stack from "@mui/material/Stack";

const SelectContractDropDown = ({selectedContract}) => {
    const [contracts, setContracts] = useState([]);
    const [anchorElement, setAnchorElement] = useState(null);

    const open = Boolean(anchorElement);

    useEffect(() => {
        ContractService.getContracts(false, TEMPLATE.SHORT).then(contracts => {
            setContracts(contracts);
        });
    }, []);

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
                {contracts.map(contract => (
                    <DropdownMenuItemLink
                        variant="menu"
                        key={contract.id}
                        id={contract.id}
                        to={`/contracts/${contract.id}`}
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
        </>
    );
};

export default SelectContractDropDown;
