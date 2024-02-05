import {useState} from "react";

function useDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return {isDialogOpen, setIsDialogOpen, openDialog, closeDialog};
}

export {useDialog};
