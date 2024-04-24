import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";
import {CommentForm} from "comment/presentational/form";
import {comment_view_adapter} from "comment/model";
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
