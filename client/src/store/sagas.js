import { all } from 'redux-saga/effects';
import {usersSaga} from './users';
import {projectSaga} from './projects';
import {rolesSaga} from './roles'
export default function* rootSaga(){
    yield all([
        usersSaga(),
        projectSaga(),
        rolesSaga()
    ])
}