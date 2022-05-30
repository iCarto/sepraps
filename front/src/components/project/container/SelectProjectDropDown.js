import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {DropdownMenuItemLink} from "components/common/presentational";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SelectProjectDropDown = ({selectedProject}) => {
    const [anchorElement, setAnchorElement] = useState(null);

    let context;
    [context] = useOutletContext();
    const {filteredProjects} = context;

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
                            fontWeight: 800,
                            lineHeight: 1.25,
                        }}
                    >
                        {selectedProject && selectedProject.code}
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
                        {selectedProject &&
                            `${selectedProject.name}, ${selectedProject.location}`}
                    </Typography>
                    {selectedProject.closed && (
                        <Typography
                            sx={{
                                pt: 2,
                                pb: 1.5,
                                lineHeight: 0,
                                fontWeight: 900,
                                color: "error.light",
                            }}
                        >
                            Archivado
                        </Typography>
                    )}
                </Box>
            </Button>
            {filteredProjects.length > 0 && (
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
                    {filteredProjects.map(project => (
                        <DropdownMenuItemLink
                            variant="menu"
                            key={project.id}
                            id={project.id}
                            to={`/projects/${project.id}/summary`}
                            selected={project === selectedProject.name}
                            onClick={handleClose}
                        >
                            <Stack>
                                <Typography>{project.code}</Typography>
                                <Typography variant="caption" sx={{ml: 1}}>
                                    {`${project.name}, ${project.location}`}
                                    {project.closed === true && " - ARCHIVADO"}
                                </Typography>
                            </Stack>
                        </DropdownMenuItemLink>
                    ))}
                </Menu>
            )}
        </>
    );
};

export default SelectProjectDropDown;
