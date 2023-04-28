import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {useNavigateWithReload} from "../../navigation/hooks";
import {AuthAction} from "../../user/components";
import {SidebarAction, SidebarPanelLayout} from "../../ui/sidebar";
import {AlertError} from "../../error/components";
import {DeleteItemDialog} from "../../delete/components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const EntityViewPanel = ({
    children,
    title,
    showDetailButton = true,
    onClickDetailButton = null,
    showEditAction = false,
    onClickEditAction = null,
    showDeleteAction = false,
    onClickDeleteAction = null,
    deleteService = null,
}) => {
    const {idInfoPanel} = useParams();
    const navigate = useNavigateWithReload();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [error, setError] = useState("");

    const location = useLocation();
    const basePath = location.pathname.split("/info/")[0];

    const handleClose = () => {
        navigate(`${basePath}`);
    };

    const handleClickDetail = () => {
        if (onClickDetailButton) {
            onClickDetailButton(idInfoPanel);
        } else {
            navigate(`${basePath}/${idInfoPanel}`);
        }
    };

    const handleClickEdit = () => {
        if (onClickEditAction) {
            onClickEditAction(idInfoPanel);
        } else {
            navigate(`${basePath}/${idInfoPanel}/edit`);
        }
    };

    const handleClickDelete = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (onClickDeleteAction) {
            onClickDeleteAction(idInfoPanel);
        } else if (deleteService) {
            deleteService(idInfoPanel)
                .then(() => {
                    navigate(basePath, true);
                })
                .catch(error => {
                    setError(error);
                });
        }
    };

    const sidebarActions = [];

    if (showDeleteAction) {
        sidebarActions.push(
            <AuthAction
                key="remove-entity"
                roles={[]} // TODO: Bootstraped permissions
            >
                <SidebarAction
                    name="remove-entity"
                    text="Eliminar"
                    icon={<DeleteIcon color="error" />}
                    onClick={() => handleClickDelete()}
                />
            </AuthAction>
        );
    }

    if (showEditAction) {
        sidebarActions.push(
            <AuthAction
                key="edit-entity"
                roles={[]} // TODO: Bootstraped permissions
            >
                <SidebarAction
                    name="edit-entity"
                    text="Modificar"
                    icon={<EditIcon />}
                    onClick={() => handleClickEdit()}
                />
            </AuthAction>
        );
    }

    return (
        <SidebarPanelLayout
            sidebarTitle={title}
            closeSidebarClick={handleClose}
            sidebarActions={sidebarActions.length > 0 ? sidebarActions : null}
        >
            <AlertError error={error} />
            {children}

            {showDetailButton && (
                <Grid container justifyContent="center" sx={{mt: 2}}>
                    <Button
                        variant="contained"
                        color="inherit"
                        sx={{ml: 3}}
                        onClick={handleClickDetail}
                        startIcon={<LaunchIcon />}
                    >
                        Ir al detalle
                    </Button>
                </Grid>
            )}
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </SidebarPanelLayout>
    );
};

export default EntityViewPanel;
