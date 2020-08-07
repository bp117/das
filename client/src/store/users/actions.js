import * as TYPES from './types';

export const fetchUsers = (payload) => ({
    type: TYPES.FETCH_USERS,
    payload
});

export const clearUsers = () => ({
    type: TYPES.CLEAR_USERS
});

export const fetchSingleUser = (payload) => ({
    type: TYPES.FETCH_SINGLE_USER,
    payload
});

export const clearSingleUser = () => ({
    type: TYPES.CLEAR_SINGLE_USER
});

export const editUser = (payload) => ({
    type: TYPES.EDIT_USER,
    payload
});

export const clearEditUser = () => ({
    type: TYPES.CLEAR_EDIT_USER
})

export const deleteUser = (payload) => ({
    type: TYPES.DELETE_USER,
    payload
});

export const clearDeleteUser = () => ({
    type: TYPES.CLEAR_DELETE_USER
})

export const addUser = (payload) => ({
    type: TYPES.ADD_USER,
    payload
});

export const clearAddUser = () => ({
    type: TYPES.CLEAR_ADD_USER
})