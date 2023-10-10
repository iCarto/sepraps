import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";
import {CommentForm} from "comment/presentational/form";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Grid from "@mui/material/Grid";
import {comment_view_adapter} from "comment/model";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {AddNewInlineItemButton, AddNewInlineItemFormBox} from "base/shared/components";

const CreateCommentDataContent = ({createService}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("button");
    const [error, setError] = useState(null);

    const handleFormSubmit = comment => {
        createService(comment_view_adapter({...comment}))
            .then(createdComment => {
                setMode("button");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return mode === "button" ? (
        <AddNewInlineItemButton
            onClick={() => {
                setMode("create");
            }}
            label="Añadir nuevo comentario"
        />
    ) : mode === "create" ? (
        <AddNewInlineItemFormBox label="Añadir nuevo comentario">
            <CommentForm
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    setMode("button");
                }}
                error={error}
            />
        </AddNewInlineItemFormBox>
    ) : null;
};

export default CreateCommentDataContent;
