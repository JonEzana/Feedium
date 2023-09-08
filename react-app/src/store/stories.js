const GET_MOST_POPULAR_STORIES = "stories/getMostPopular";
const GET_CURRENT_USER_STORIES = "stories/getCurrentUser";
const GET_SINGLE_STORY = "stories/getSingle";
const GET_ALL_STORIES = "stories/getAll";
const CREATE_STORY = "stories/create";
const UPDATE_STORY = "stories/update";
const DELETE_STORY = "stories/delete"

const getMostPopularStories = (stories) => ({
    type: GET_MOST_POPULAR_STORIES,
    payload: stories
});

const getCurrentUserStories = (stories) => ({
    type: GET_CURRENT_USER_STORIES,
    payload: stories
});

const getSingleStory = (story) => ({
    type: GET_SINGLE_STORY,
    payload: story
});

const getAllStories = (stories) => ({
    type: GET_ALL_STORIES,
    payload: stories
});

const createStory = (story) => ({
    type: CREATE_STORY,
    payload: story
});

const updateStory = (story) => ({
    type: UPDATE_STORY,
    payload: story
});

const deleteStory = (id) => ({
    type: DELETE_STORY,
    payload: id
});

export const thunkGetMostPopularStories = () => async (dispatch) => {
    const res = await fetch('/api/stories/most-popular');
    if (res.ok) {
        const stories = await res.json();
        dispatch(getMostPopularStories(stories.stories));
        return stories;
    } else {
        console.log('most popular fetch failed');
    }
}

export const thunkGetCurrentUserStories = (userId) => async (dispatch) => {
    const res = await fetch(`/api/stories/users/${userId}/stories`);
    if (res.ok) {
        const stories = await res.json();
        dispatch(getCurrentUserStories(stories.stories))
        return stories
    } else {
        console.log('current user stories fetch failed');
    }
}

export const thunkGetSingleStory = (storyId) => async (dispatch) => {
    const res  = await fetch(`/api/stories/${storyId}`);
    if (res.ok) {
        const story = await res.json();
        dispatch(getSingleStory(story));
        return story;
    }
}

export const thunkGetAllStories = () => async (dispatch) => {
    const res = await fetch('/api/stories/all');
    if (res.ok) {
        const stories = await res.json();
        dispatch(getAllStories(stories.stories));
        return stories;
    }
}

export const thunkCreateStory = (story) => async (dispatch) => {
    const res = await fetch('/api/stories/new', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(story)
    });
    if (res.ok) {
        const newStory = await res.json();
        dispatch(createStory(newStory));
        return newStory;
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkUpdateStory = (story) => async (dispatch) => {
    const res = await fetch(`/api/stories/${story.id}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(story)
    });
    if (res.ok) {
        const story = await res.json();
        dispatch(updateStory(story));
        return story;
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkDeleteStory = (id) => async (dispatch) => {
    const res = await fetch(`/api/stories/${id}/delete`, {method: "DELETE"});
    if (res.ok) {
        dispatch(deleteStory(id));
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

const initialState = {allStories: {}, hotStories: {}, usersStories: {}, singleStory: {}}

export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOST_POPULAR_STORIES: {
            const newState = {...state, allStories: {}, hotStories: {}, usersStories: {}};
            action.payload.forEach(story => {
                newState.hotStories[story.id] = story
            });
            return newState;
        }
        case GET_CURRENT_USER_STORIES: {
            const newState = {...state, allStories: {...state.allStories}, userStories: {}};
            action.payload.forEach(story => {
                newState.userStories[story.id] = story;
            });
            return newState
        }
        case GET_SINGLE_STORY: {
            return {
                ...state,
                allStories: {...state.allStories, [action.payload.id]: action.payload},
                hotStories: {...state.hotStories},
                userStories: {...state.usersStories},
                singleStory: {...action.payload}
            }
        }
        case GET_ALL_STORIES: {
            const newState = {...state, allStories: {}};
            action.payload.forEach(story => {
                newState.allStories[story.id] = story;
            });
            return newState;
        }
        case CREATE_STORY: {
            return {
                ...state,
                allStories: {...state.allStories, [action.payload.id]: action.payload},
                userStories: {...state.usersStories, [action.payload.id]: action.payload},
                singleStory: {...action.payload}
            }
        }
        case UPDATE_STORY: {
            return {
                ...state,
                allStories: {...state.allStories, [action.payload.id]: action.payload},
                hotStories: {...state.hotStories},
                userStories: {...state.usersStories, [action.payload.id]: action.payload},
                singleStory: {...action.payload}
            }
        }
        case DELETE_STORY: {
            const newState = {
                ...state,
                allStories: {...state.allStories},
                hotStories: {...state.hotStories},
                userStories: {...state.usersStoriesallStories}
            }
            delete newState.allStories[action.payload];
            delete newState.hotStories[action.payload];
            delete newState.userStories[action.payload];
            return newState;
        }
        default:
            return state;
    }
}
