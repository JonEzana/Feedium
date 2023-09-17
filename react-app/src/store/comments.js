const CREATE_COMMENT = "comments/create";
const GET_STORY_COMMENTS = "comments/storyComments";
const DELETE_COMMENT = "comments/delete";
const UPDATE_COMMENT = "comments/update";

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
});

const getStoryComments = (comments) => ({
    type: GET_STORY_COMMENTS,
    payload: comments
});

const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    payload: id
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
});

export const thunkCreateComment = (commentData, storyId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${storyId}/new`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(commentData)
    });
    if (res.ok) {
        const comment = await res.json();
        dispatch(createComment(comment));
        return comment;
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkCommentsByStoryId = (storyId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${storyId}`);
    if (res.ok) {
        const comments = await res.json();
        dispatch(getStoryComments(comments.comments));
        return comments;
    }
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}/delete`, {method: "DELETE"});
    if (res.ok) {
        dispatch(deleteComment(commentId));
    } else {
        return "Failed to delete comment";
    }
}

export const thunkUpdateComment = (commentData) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentData.id}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(commentData)
    });
    if (res.ok) {
        const comment = await res.json();
        dispatch(updateComment(comment));
        return comment;
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

const initialState = {userComments: {}, storyComments: {}};

export default function commentsReducer(state = initialState, action) {
    switch(action.type) {
        case CREATE_COMMENT: {
            return {
                ...state,
                userComments: {...state.userComments, [action.payload.id]: action.payload},
                storyComments: {...state.storyComments, [action.payload.id]: action.payload}
            };
        }
        case GET_STORY_COMMENTS: {
            const newState = {...state, storyComments: {}};
            action.payload.forEach(comment => {
                newState.storyComments[comment.id] = comment;
            });
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = {...state, userComments: {...state.userComments}, storyComments: {...state.storyComments}};
            delete newState.userComments[action.payload];
            delete newState.storyComments[action.payload];
            return newState;
        }
        case UPDATE_COMMENT: {
            return {
                ...state,
                userComments: {...state.userComments, [action.payload.id]: action.payload},
                storyComments: {...state.storyComments, [action.payload.id]: action.payload}
            };
        }
        default:
            return state;
    }
}
