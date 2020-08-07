import { combineReducers } from 'redux';
import * as TYPES from './types';

const initialState = {
roles: {
    data: null,
    loading: false,
    error: null,
},
};

const roles = (state = {...initialState.roles}, action) => {
    switch (action.type) {
        case TYPES.FETCH_ROLES:
            return { ...initialState.roles, loading: true };
        case TYPES.ROLES_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.ROLES_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_ROLES:
            return {...initialState.roles};
        default:
            return state;
    }
};

const singleRole = (state = {...initialState.roles}, action) => {
    switch (action.type) {
        case TYPES.FETCH_SINGLE_ROLE:
            return { ...initialState.roles, loading: true };
        case TYPES.SINGLE_ROLE_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.SINGLE_ROLE_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_SINGLE_ROLE:
            return {...initialState.roles};
        default:
            return state;
    }
};

const editRole = (state = {...initialState.roles}, action) => {
    switch (action.type) {
        case TYPES.EDIT_ROLE:
            return { ...initialState.roles, loading: true };
        case TYPES.EDIT_ROLE_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.EDIT_ROLE_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_EDIT_ROLE:
            return {...initialState.roles};
        default:
            return state;
    }
};

const deleteRole = (state = {...initialState.roles}, action) => {
    switch (action.type) {
        case TYPES.DELETE_ROLE:
            return { ...initialState.roles, loading: true };
        case TYPES.DELETE_ROLE_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.DELETE_ROLE_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_DELETE_ROLE:
            return {...initialState.roles};
        default:
            return state;
    }
};

const addRole = (state = {...initialState.roles}, action) => {
    switch (action.type) {
        case TYPES.ADD_ROLE:
            return { ...initialState.roles, loading: true };
        case TYPES.ADD_ROLE_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.ADD_ROLE_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_ADD_ROLE:
            return {...initialState.roles};
        default:
            return state;
    }
};

const rolesReducer = combineReducers({
    roles,
    singleRole,
    editRole,
    deleteRole,
    addRole
});

export default rolesReducer;