import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DialogLayout = ({
    dialogTitle = "",
    dialogHeading = null,
    dialogLabel = "",
    dialogContent = null,
    dialogContentText = "",
    mainActionClick = null,
    mainActionColor = "info",
    mainActionText = "",
    handleDialog = null,
    isDialogOpen = null,
    fullHeight = false,
    fullWidth = false,
    maxWidth = "sm",
    style = null,
}) => {
    const handleCloseDialog = () => {
        handleDialog(false);
    };

    const dialogStyle = fullHeight
        ? {
              "& .MuiDialog-paper": {
                  minHeight: "calc(100% - 24px)",
                  ...style,
              },
          }
        : {
              "& .MuiDialog-paper": {
                  ...style,
              },
          };

    return (
        <Dialog
            open={isDialogOpen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            aria-labelledby={dialogLabel}
            aria-describedby={dialogLabel}
            sx={dialogStyle}
        >
            <DialogTitle id={dialogLabel}>{dialogTitle}</DialogTitle>
            {dialogHeading ? <Stack px={3}>{dialogHeading}</Stack> : null}
            <DialogContent>
                {dialogContentText ? (
                    <DialogContentText id={`${dialogLabel} dialog`}>
                        {dialogContentText}
                    </DialogContentText>
                ) : null}
                {dialogContent}
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
