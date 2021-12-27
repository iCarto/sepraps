import {useState, useEffect} from "react";
import {ProjectService} from "service/api";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SelectProjectDropDown = ({handleProjectData, MenuListItemLink}) => {
    const [projectNames, setProjectNames] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        ProjectService.getProjectsName().then(projects => {
            setProjectNames(projects);
        });
    }, []);

    let selectedProject = [];

    const handleSelect = event => {
        handleClose();

        selectedProject = projectNames.find(project => project.id == event.target.id);

        handleProjectData(selectedProject.name);
    };

    const projectNamesList = projectNames.map(projectName => {
        return (
            <MenuListItemLink
                key={projectName.id}
                id={projectName.id}
                to={`/project/${projectName.id}`}
                onClick={handleSelect}
            >
                {projectName.name}
            </MenuListItemLink>
        );
    });

    return (
        <>
            <Button
                id="positioned-button"
                aria-controls="positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Proyectos
            </Button>
            <Menu
                id="positioned-menu"
                aria-labelledby="positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuListItemLink to={"/"}>Todos</MenuListItemLink>
                {projectNamesList}
            </Menu>
        </>
    );
};

export default SelectProjectDropDown;
