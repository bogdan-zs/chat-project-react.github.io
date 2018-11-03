import {all} from 'redux-saga/effects'
import {saga as messagesSagas} from '../ducks/messages'
import {saga as userSaga} from '../ducks/user'

export default function * rootSaga() {
    yield all([
        messagesSagas(),
        userSaga()
    ])
}
