class Comments extends Array {}

const comment_api_adapter = comment => {
    return comment;
};

const comment_view_adapter = comment => {
    delete comment["created_by"];
    delete comment["created_at"];
    delete comment["updated_at"];
    delete comment["updated_by"];

    return comment;
};

const comments_api_adapter = comments => {
    return comments.map(comment_api_adapter);
};

const createComments = (data = []) => {
    const comments = Comments.from(data, comment => createComment(comment));
    return comments;
};

const createComment = ({
    id = null,
    text = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        text,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createComment as default,
    createComments,
    comment_api_adapter,
    comments_api_adapter,
    comment_view_adapter,
};
