import { combineReducers } from 'redux';
import * as TYPES from './types';

const initialState = {
projects: {
    data: null,
    loading: false,
    error: null,
},
};

const projects = (state = {...initialState.projects}, action) => {
    switch (action.type) {
        case TYPES.FETCH_PROJECTS:
            return { ...initialState.projects, loading: true };
        case TYPES.PROJECTS_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.PROJECTS_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_PROJECTS:
            return {...initialState.projects};
        default:
            return state;
    }
};

const singleProject = (state = {...initialState.projects}, action) => {
    switch (action.type) {
        case TYPES.FETCH_SINGLE_PROJECT:
            return { ...initialState.projects, loading: true };
        case TYPES.SINGLE_PROJECT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.SINGLE_PROJECT_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_SINGLE_PROJECT:
            return {...initialState.projects};
        default:
            return state;
    }
};

const editProject = (state = {...initialState.projects}, action) => {
    switch (action.type) {
        case TYPES.EDIT_PROJECT:
            return { ...initialState.projects, loading: true };
        case TYPES.EDIT_PROJECT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.EDIT_PROJECT_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_EDIT_PROJECT:
            return {...initialState.projects};
        default:
            return state;
    }
};

const deleteProject = (state = {...initialState.projects}, action) => {
    switch (action.type) {
        case TYPES.DELETE_PROJECT:
            return { ...initialState.projects, loading: true };
        case TYPES.DELETE_PROJECT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.DELETE_PROJECT_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_DELETE_PROJECT:
            return {...initialState.projects};
        default:
            return state;
    }
};

const addProject = (state = {...initialState.projects}, action) => {
    switch (action.type) {
        case TYPES.ADD_PROJECT:
            return { ...initialState.projects, loading: true };
        case TYPES.ADD_PROJECT_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case TYPES.ADD_PROJECT_FAILED:
            return { ...state, loading: false, error: action.error };
        case TYPES.CLEAR_ADD_PROJECT:
            return {...initialState.projects};
        default:
            return state;
    }
};

const projectsReducer = combineReducers({
    projects,
    singleProject,
    editProject,
    deleteProject,
    addProject
});

export default projectsReducer;