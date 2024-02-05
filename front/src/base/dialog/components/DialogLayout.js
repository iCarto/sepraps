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
    mainActionColor = "info",
    mainActionText = "",
    onMainActionClick = null,
    onCloseDialog = null,
    isDialogOpen = false,
    fullHeight = false,
    fullWidth = false,
    maxWidth = "sm",
    style = null,
}) => {
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
            {onCloseDialog || onMainActionClick ? (
                <DialogActions>
                    {onCloseDialog ? (
                        <Button onClick={onCloseDialog} autoFocus>
                            Cancelar
                        </Button>
                    ) : null}
                    {onMainActionClick ? (
                        <Button
                            onClick={onMainActionClick}
                            color={mainActionColor}
                            variant="contained"
                        >
                            {mainActionText}
                        </Button>
                    ) : null}
                </DialogActions>
            ) : null}
        </Dialog>
    );
};

export default DialogLayout;
