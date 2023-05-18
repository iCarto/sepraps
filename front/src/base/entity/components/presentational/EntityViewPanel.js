import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {
    SidebarDeleteAction,
    SidebarEditAction,
    SidebarPanelLayout,
    SidebarRemoveAction,
} from "base/ui/sidebar";
import {AlertError} from "base/error/components";
import {DeleteItemDialog, RemoveItemDialog} from "base/delete/components";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";

const EntityViewPanel = ({
    children,
    title,
    showDetailButton = true,
    onClickDetailButton = null,
    showEditAction = false,
    onClickEditAction = null,
    showDeleteAction = false,
    onClickDeleteAction = null,
    showRemoveAction = false,
    onClickRemoveAction = null,
    deleteService = null,
    onClickCloseSidebar = null,
    createEntityObject = null,
    entity = {},
    subEntityName = "",
    subEntityList = [],
}) => {
    const {idInfoPanel} = useParams();
    const navigate = useNavigateWithReload();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [error, setError] = useState("");

    const location = useLocation();
    const basePath = location.pathname.split("/info/")[0];

    const handleClose = () => {
        if (onClickCloseSidebar) {
            onClickCloseSidebar();
        } else {
            navigate(`${basePath}`);
        }
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

    const handleClickRemove = () => {
        setIsRemoveDialogOpen(true);
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

    const handleRemove = updatedEntity => {
        onClickRemoveAction(updatedEntity);
    };

    const sidebarActions = [];

    if (showEditAction) {
        sidebarActions.push(<SidebarEditAction onClick={handleClickEdit} />);
    }

    if (showRemoveAction) {
        sidebarActions.push(<SidebarRemoveAction onClick={handleClickRemove} />);
    }

    if (showDeleteAction) {
        sidebarActions.push(<SidebarDeleteAction onClick={handleClickDelete} />);
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
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleRemove}
                itemToRemove={idInfoPanel}
                createEntityObject={createEntityObject}
                entity={entity}
                subEntityList={subEntityList}
                subEntityName={subEntityName}
            />
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </SidebarPanelLayout>
    );
};

export default EntityViewPanel;
