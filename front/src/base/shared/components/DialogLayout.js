import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const DialogLayout = ({
    dialogTitle = "",
    dialogLabel = "",
    dialogContentText = "",
    mainActionClick = null,
    mainActionColor = "info",
    mainActionText = "",
    handleDialog = null,
    isDialogOpen = null,
}) => {
    const handleCloseDialog = () => {
        handleDialog(false);
    };

    return (
        <Dialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby={dialogLabel}
            aria-describedby={dialogLabel}
        >
            <DialogTitle id={dialogLabel}>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id={`${dialogLabel} dialog`}>
                    {dialogContentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} autoFocus>
                    Cancelar
                </Button>
                <Button
                    onClick={mainActionClick}
                    color={mainActionColor}
                    variant="contained"
                >
                    {mainActionText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogLayout;
