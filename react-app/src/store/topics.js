const ALL_TOPICS = "topics/all";

const getAllTopics = (topics) => ({
    type: ALL_TOPICS,
    payload: topics
});

export const thunkGetAllTopics = () => async(dispatch) => {
    const res = await fetch('/api/topics');
    if (res.ok) {
        const topics = await res.json();
        dispatch(getAllTopics(topics.topics));
        return topics.topics
    }
}

const initialState = {allTopics: {}, storyTopics: {}};

export default function topicsReducer(state = initialState, action) {
    switch(action.type) {
        case ALL_TOPICS: {
            const newState = {...state, allTopics: {...state.allTopics}, storyTopics: {...state.storyTopics}};
            action.payload.forEach(topic => {
                newState.allTopics[topic.id] = topic
            });
            return newState;
        }
        default:
            return state
    }
}
