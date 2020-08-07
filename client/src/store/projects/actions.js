import * as TYPES from './types';

export const fetchProjects = (payload) => ({
    type: TYPES.FETCH_PROJECTS,
    payload
});

export const clearProjects = () => ({
    type: TYPES.CLEAR_PROJECTS
});

export const fetchSingleProject = (payload) => ({
    type: TYPES.FETCH_SINGLE_PROJECT,
    payload
});

export const clearSingleProject = () => ({
    type: TYPES.CLEAR_SINGLE_PROJECT
});

export const editProject = (payload) => ({
    type: TYPES.EDIT_PROJECT,
    payload
});

export const clearEditProject = () => ({
    type: TYPES.CLEAR_EDIT_PROJECT
})

export const deleteProject = (payload) => ({
    type: TYPES.DELETE_PROJECT,
    payload
});

export const clearDeleteProject = () => ({
    type: TYPES.CLEAR_DELETE_PROJECT
})

export const addProject = (payload) => ({
    type: TYPES.ADD_PROJECT,
    payload
});

export const clearAddProject = () => ({
    type: TYPES.CLEAR_ADD_PROJECT
})