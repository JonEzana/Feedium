const GET_ALL_USERS = "/users/all";

const getAllUsers = (users) => ({
    type: GET_ALL_USERS,
    payload: users
});

export const thunkGetAllUsers = () => async(dispatch) => {
    const res = await fetch('/api/users/all');
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllUsers(data.users));
        return data;
    }
}

const initialState = {allUsers: {}}

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS: {
            const newState = {...state, allUsers: {...state.allUsers}};
            action.payload.forEach(user => {
                newState.allUsers[user.id] = user;
            });
            return newState;
        }
        default:
            return state;
    }
}
