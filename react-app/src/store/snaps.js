const GET_SNAPS = "snaps/get";
const CREATE_SNAP = "snaps/change";
const DELETE_SNAP = "snaps/delete";

const getSnaps = (snaps) => ({
    type: GET_SNAPS,
    payload: snaps
});

const createSnap = (snaps) => ({
    type: CREATE_SNAP,
    payload: snaps
});

const deleteSnap = (snaps) => ({
    type: DELETE_SNAP,
    payload: snaps
});

export const thunkGetSnaps = () => async(dispatch) => {
    const res = await fetch(`/api/snaps/all`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getSnaps(data.storySnaps));
        return data;
    } else {
    }
}

export const thunkChangeSnap = (storyId, userId) => async(dispatch) => {
    const res = await fetch(`/api/snaps/${storyId}/${userId}/change`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            story_id: storyId,
            user_id: userId
        })
    });
    if (res.ok) {
        const data = await res.json();
        if (!data["Delete"]) dispatch(createSnap(data.snappedStory))
        else dispatch(deleteSnap(data.snappedStory));
        return data;
    }
}

const initialState = {allSnaps: {}}
export default function snapsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_SNAPS: {
            return {...state, allSnaps: {...action.payload}}
        }
        case CREATE_SNAP: {
            return {
                ...state,
                allSnaps: {...state.allSnaps, [action.payload.id]: action.payload}
            }
        }
        case DELETE_SNAP: {
            const newState = {...state, allSnaps: {...state.allSnaps}};
            delete newState[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}
