const GET_MOST_POPULAR_STORIES = "stories/getMostPopular";
const GET_CURRENT_USER_STORIES = "stories/getCurrentUser";
const GET_SINGLE_STORY = "stories/getSingle";
const CREATE_STORY = "stories/create";

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

const createStory = (story) => ({
    type: CREATE_STORY,
    payload: story
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
        console.log('current user storoes fetch failed');
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
        case CREATE_STORY: {
            return {
                ...state,
                allStories: {...state.allStories, [action.payload.id]: action.payload},
                userStories: {...state.usersStories, [action.payload.id]: action.payload},
                singleStory: {...action.payload}
            }
        }
        default:
            return state;
    }
}
