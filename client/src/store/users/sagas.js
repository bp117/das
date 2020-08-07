import { put, takeLatest, call, all } from 'redux-saga/effects';
import * as TYPES from './types';
import { usersApi, singleUserApi, editUserApi, deleteUserApi, addUserApi } from './api';

function* users(payload) {
    try {
        const response = yield call(usersApi, payload.payload);
        yield put({
            type: TYPES.USERS_SUCCESS,
            payload: response,
        });
    } catch (error) {
        yield put({
            type: TYPES.USERS_FAILED,
            error: error && error.message,
        });
    }
}

function* singleUser(payload) {
    try {
        const response = yield call(singleUserApi, payload.payload);
        yield put({
            type: TYPES.SINGLE_USER_SUCCESS,
            payload: response,
        });
    } catch (error) {
        yield put({
            type: TYPES.SINGLE_USER_FAILED,
            error: error && error.message,
        });
    }
}

function* editUser(payload) {
    try {
        const response = yield call(editUserApi, payload.payload);
        yield put({
            type: TYPES.EDIT_USER_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_USERS});
    } catch (error) {
        yield put({
            type: TYPES.EDIT_USER_FAILED,
            error: error && error.message,
        });
    }
}

function* deleteUser(payload) {
    try {
        const response = yield call(deleteUserApi, payload.payload);
        yield put({
            type: TYPES.DELETE_USER_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_USERS});

    } catch (error) {
        yield put({
            type: TYPES.DELETE_USER_FAILED,
            error: error && error.message,
        });
    }
}

function* addUser(payload) {
    try {
        const response = yield call(addUserApi, payload.payload);
        yield put({
            type: TYPES.ADD_USER_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_USERS});

    } catch (error) {
        yield put({
            type: TYPES.ADD_USER_FAILED,
            error: error && error.message,
        });
    }
}


export default function* usersSaga() {
    yield all([
        yield takeLatest(TYPES.FETCH_USERS, users),
        yield takeLatest(TYPES.FETCH_SINGLE_USER, singleUser),
        yield takeLatest(TYPES.EDIT_USER, editUser),
        yield takeLatest(TYPES.DELETE_USER, deleteUser),
        yield takeLatest(TYPES.ADD_USER, addUser)
    ])
}