import {
    CreateCommentDataContent,
    ViewOrUpdateCommentDataContent,
} from "../../comment/container";
import {SectionCard} from "base/ui/section/components";

import Stack from "@mui/system/Stack";

const ViewOrUpdateCommentsContent = ({entity, service}) => {
    return (
        entity && (
            <SectionCard title="Gestor de comentarios">
                <Stack spacing={2}>
                    {entity.comments.map(comment => {
                        return (
                            <ViewOrUpdateCommentDataContent
                                key={comment.id}
                                comment={comment}
                            />
                        );
                    })}
                    <CreateCommentDataContent
                        createService={comment =>
                            service.createComment(entity.id, comment)
                        }
                    />
                </Stack>
            </SectionCard>
        )
    );
};

export default ViewOrUpdateCommentsContent;
