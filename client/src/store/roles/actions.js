import * as TYPES from './types';

export const fetchRoles = (payload) => ({
    type: TYPES.FETCH_ROLES,
    payload
});

export const clearRoles = () => ({
    type: TYPES.CLEAR_ROLES
});

export const fetchSingleRole = (payload) => ({
    type: TYPES.FETCH_SINGLE_ROLE,
    payload
});

export const clearSingleRole = () => ({
    type: TYPES.CLEAR_SINGLE_ROLE
});

export const editRole = (payload) => ({
    type: TYPES.EDIT_ROLE,
    payload
});

export const clearEditRole = () => ({
    type: TYPES.CLEAR_EDIT_ROLE
})

export const deleteRole = (payload) => ({
    type: TYPES.DELETE_ROLE,
    payload
});

export const clearDeleteRole = () => ({
    type: TYPES.CLEAR_DELETE_ROLE
})

export const addRole = (payload) => ({
    type: TYPES.ADD_ROLE,
    payload
});

export const clearAddRole = () => ({
    type: TYPES.CLEAR_ADD_ROLE
})