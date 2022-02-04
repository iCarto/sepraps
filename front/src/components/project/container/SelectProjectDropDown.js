import {useState, useEffect} from "react";
import {ProjectService, PROJECT_TEMPLATE} from "service/api";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {MenuListItemLink} from "components/common/presentational";
import Stack from "@mui/material/Stack";

const SelectProjectDropDown = () => {
    const [projects, setProjects] = useState([]);
    const [anchorElement, setAnchorElement] = useState(null);

    const open = Boolean(anchorElement);

    const {id} = useParams();

    useEffect(() => {
        ProjectService.getProjects(false, PROJECT_TEMPLATE.SHORT).then(projects => {
            setProjects(projects);
        });
    }, []);

    let selectedProject = projects.find(project => project.id == id);

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
                        {selectedProject && selectedProject.name}
                    </Typography>
                    <Typography
                        variant="overline"
                        color="grey.900"
                        sx={{
                            pt: 1.5,
                            lineHeight: 0,
                            fontWeight: 500,
                            letterSpacing: "0.5px",
                            color: "white",
                        }}
                    >
                        {selectedProject && selectedProject.code}
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
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {projects.map(project => (
                    <MenuListItemLink
                        variant="menu"
                        key={project.id}
                        id={project.id}
                        to={`/projects/${project.id}`}
                        selected={project === selectedProject.name}
                        onClick={handleClose}
                    >
                        <Stack>
                            <Typography>{project.name}</Typography>
                            <Typography variant="caption" sx={{ml: 1}}>
                                {project.code}
                            </Typography>
                        </Stack>
                    </MenuListItemLink>
                ))}
            </Menu>
        </>
    );
};

SelectProjectDropDown.propTypes = {
    children: PropTypes.node,
};

export default SelectProjectDropDown;
