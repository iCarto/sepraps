import {useState, useEffect} from "react";
import {ProjectService} from "service/api";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const SelectProjectDropDown = ({MenuListItemLink}) => {
    const [projectInfo, setProjectInfo] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const {id} = useParams();

    useEffect(() => {
        ProjectService.getProjectsName().then(projects => {
            setProjectInfo(projects);
        });
    }, []);

    let selectedProject = projectInfo.find(project => project.id == id);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                    // color: "white",
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
                        }}
                    >
                        {selectedProject && selectedProject.code}
                    </Typography>
                </Box>
            </Button>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
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
                {projectInfo.map(project => (
                    <MenuListItemLink
                        variant="menu"
                        key={project.id}
                        id={project.id}
                        to={`/project/${project.id}`}
                        selected={project === selectedProject.name}
                        onClick={handleClose}
                    >
                        {project.name} - {project.code}
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
