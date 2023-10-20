import {
    createComment,
    createComments,
    comment_api_adapter,
    comments_api_adapter,
} from "comment/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/comments";

const entityService = createEntityService(
    basePath,
    createComment,
    createComments,
    comment_api_adapter,
    comments_api_adapter
);

const CommentService = {
    get(id) {
        return entityService.get(id).then(data => {
            return data;
        });
    },

    update(entity) {
        return entityService.update(entity);
    },

    delete(id) {
        return entityService.delete(id);
    },
};

export default CommentService;
