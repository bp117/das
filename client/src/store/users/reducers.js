import { combineReducers } from 'redux';
import * as TYPES from './types';

const initialState = {
users: {
    data: null,
    loading: false,
    error: null,
},
};

const users = (state = {...initialState.users}, action) => {
    switch (action.type) {
        case TYPES.FETCH_USERS:
            return { ...initialState.users, loading: true };
        case TYPES.USERS_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.USERS_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_USERS:
            return {...initialState.users};
        default:
            return state;
    }
};

const singleUser = (state = {...initialState.users}, action) => {
    switch (action.type) {
        case TYPES.FETCH_SINGLE_USER:
            return { ...initialState.users, loading: true };
        case TYPES.SINGLE_USER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.SINGLE_USER_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_SINGLE_USER:
            return {...initialState.users};
        default:
            return state;
    }
};

const editUser = (state = {...initialState.users}, action) => {
    switch (action.type) {
        case TYPES.EDIT_USER:
            return { ...initialState.users, loading: true };
        case TYPES.EDIT_USER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.EDIT_USER_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_EDIT_USER:
            return {...initialState.users};
        default:
            return state;
    }
};

const deleteUser = (state = {...initialState.users}, action) => {
    switch (action.type) {
        case TYPES.DELETE_USER:
            return { ...initialState.users, loading: true };
        case TYPES.DELETE_USER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.DELETE_USER_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_DELETE_USER:
            return {...initialState.users};
        default:
            return state;
    }
};

const addUser = (state = {...initialState.users}, action) => {
    switch (action.type) {
        case TYPES.ADD_USER:
            return { ...initialState.users, loading: true };
        case TYPES.ADD_USER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.ADD_USER_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_ADD_USER:
            return {...initialState.users};
        default:
            return state;
    }
};

const usersReducer = combineReducers({
    users,
    singleUser,
    editUser,
    deleteUser,
    addUser
});

export default usersReducer;