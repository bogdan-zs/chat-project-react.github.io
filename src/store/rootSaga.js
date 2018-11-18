import {all} from 'redux-saga/effects'
import {saga as messagesSagas} from '../ducks/messages'
import {saga as userSaga} from '../ducks/user'
import {saga as pointsSaga} from '../ducks/points'

export default function * rootSaga() {
    yield all([
        messagesSagas(),
        userSaga(),
        pointsSaga()
    ])
}
