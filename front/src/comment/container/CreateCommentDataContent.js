import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";
import {CommentForm} from "comment/presentational/form";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import {SectionCard} from "base/ui/section/components";
import {comment_view_adapter} from "comment/model";

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

    const getComponent = mode => {
        if (mode === "button") {
            return (
                <Grid container justifyContent="center">
                    <IconButton
                        aria-label="delete"
                        size="large"
                        color="primary"
                        onClick={() => {
                            setMode("create");
                        }}
                    >
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </Grid>
            );
        }
        if (mode === "create") {
            return (
                <SectionCard>
                    <CommentForm
                        onSubmit={handleFormSubmit}
                        onCancel={() => {
                            setMode("view");
                        }}
                        error={error}
                    />
                </SectionCard>
            );
        }
    };

    return getComponent(mode);
};

export default CreateCommentDataContent;
