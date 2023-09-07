const GET_MOST_POPULAR_STORIES = "stories/getMostPopular"

const getMostPopularStories = (stories) => ({
    type: GET_MOST_POPULAR_STORIES,
    payload: stories
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

const initialState = {allStories: {}, hotStories: {}, usersStories: {}}

export default function storiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOST_POPULAR_STORIES: {
            const newState = {...state, allStories: {}, hotStories: {}, usersStories: {}};
            action.payload.forEach(story => {
                newState.hotStories[story.id] = story
            });
            return newState;
        }
        default:
            return state;
    }
}
