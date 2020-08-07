import { put, takeLatest, call, all } from 'redux-saga/effects';
import * as TYPES from './types';
import { projectsApi, singleProjectApi, editProjectApi, deleteProjectApi, addProjectApi } from './api';

function* projects(payload) {
    try {
        const response = yield call(projectsApi, payload.payload);
        yield put({
            type: TYPES.PROJECTS_SUCCESS,
            payload: response,
        });
    } catch (error) {
        yield put({
            type: TYPES.PROJECTS_FAILED,
            error: error && error.message,
        });
    }
}

function* singleProject(payload) {
    try {
        const response = yield call(singleProjectApi, payload.payload);
        yield put({
            type: TYPES.SINGLE_PROJECT_SUCCESS,
            payload: response,
        });
    } catch (error) {
        yield put({
            type: TYPES.SINGLE_PROJECT_FAILED,
            error: error && error.message,
        });
    }
}

function* editProject(payload) {
    try {
        const response = yield call(editProjectApi, payload.payload);
        yield put({
            type: TYPES.EDIT_PROJECT_SUCCESS,
            payload: response,
        });
    } catch (error) {
        yield put({
            type: TYPES.EDIT_PROJECT_FAILED,
            error: error && error.message,
        });
    }
}

function* deleteProject(payload) {
    try {
        const response = yield call(deleteProjectApi, payload.payload);
        yield put({
            type: TYPES.DELETE_PROJECT_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_PROJECTS});

    } catch (error) {
        yield put({
            type: TYPES.DELETE_PROJECT_FAILED,
            error: error && error.message,
        });
    }
}

function* addProject(payload) {
    try {
        const response = yield call(addProjectApi, payload.payload);
        yield put({
            type: TYPES.ADD_PROJECT_SUCCESS,
            payload: response,
        });
        yield put({ type: TYPES.FETCH_PROJECTS});

    } catch (error) {
        yield put({
            type: TYPES.ADD_PROJECT_FAILED,
            error: error && error.message,
        });
    }
}


export default function* projectsSaga() {
    yield all([
        yield takeLatest(TYPES.FETCH_PROJECTS, projects),
        yield takeLatest(TYPES.FETCH_SINGLE_PROJECT, singleProject),
        yield takeLatest(TYPES.EDIT_PROJECT, editProject),
        yield takeLatest(TYPES.DELETE_PROJECT, deleteProject),
        yield takeLatest(TYPES.ADD_PROJECT, addProject)
    ])
}