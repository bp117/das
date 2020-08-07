import { put, takeLatest, call, all } from 'redux-saga/effects';
import * as TYPES from './types';
import { rolesApi, singleRoleApi, editRoleApi, deleteRoleApi, addRoleApi } from './api';

function* roles(payload) {
    try {
        const response = yield call(rolesApi, payload.payload);
        yield put({
            type: TYPES.ROLES_SUCCESS,
            payload: response,
        });
    } catch (error) {
        yield put({
            type: TYPES.ROLES_FAILED,
            error: error && error.message,
        });
    }
}

function* singleRole(payload) {
    try {
        const response = yield call(singleRoleApi, payload.payload);
        yield put({
            type: TYPES.SINGLE_ROLE_SUCCESS,
            payload: response,
        });
    } catch (error) {
        yield put({
            type: TYPES.SINGLE_ROLE_FAILED,
            error: error && error.message,
        });
    }
}

function* editRole(payload) {
    try {
        const response = yield call(editRoleApi, payload.payload);
        yield put({
            type: TYPES.EDIT_ROLE_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_ROLES});
    } catch (error) {
        yield put({
            type: TYPES.EDIT_ROLE_FAILED,
            error: error && error.message,
        });
    }
}

function* deleteRole(payload) {
    try {
        const response = yield call(deleteRoleApi, payload.payload);
        yield put({
            type: TYPES.DELETE_ROLE_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_ROLES});

    } catch (error) {
        yield put({
            type: TYPES.DELETE_ROLE_FAILED,
            error: error && error.message,
        });
    }
}

function* addRole(payload) {
    try {
        const response = yield call(addRoleApi, payload.payload);
        yield put({
            type: TYPES.ADD_ROLE_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_ROLES});

    } catch (error) {
        yield put({
            type: TYPES.ADD_ROLE_FAILED,
            error: error && error.message,
        });
    }
}


export default function* rolesSaga() {
    yield all([
        yield takeLatest(TYPES.FETCH_ROLES, roles),
        yield takeLatest(TYPES.FETCH_SINGLE_ROLE, singleRole),
        yield takeLatest(TYPES.EDIT_ROLE, editRole),
        yield takeLatest(TYPES.DELETE_ROLE, deleteRole),
        yield takeLatest(TYPES.ADD_ROLE, addRole)
    ])
}