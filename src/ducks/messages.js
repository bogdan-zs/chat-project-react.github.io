import {app} from '../config'
import {OrderedMap, Record} from 'immutable'
import firebase from 'firebase'
import {all, put, call, takeEvery, take, spawn} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {fbDateToMap} from './utiles'
import {createSelector} from 'reselect'

export const moduleName = 'messages'

const ADD_MESSAGE_REQUEST = `${app}/${moduleName}/ADD_MESSAGE_REQUEST`
const ADD_MESSAGE_SUCCESS = `${app}/${moduleName}/ADD_MESSAGE_SUCCESS`
const FETCH_ALL_REQUEST = `${app}/${moduleName}/FETCH_ALL_REQUEST`
const FETCH_ALL_SUCCESS = `${app}/${moduleName}/FETCH_ALL_SUCCESS`

const MessageModel = Record({
    uid: null,
    avatar: null,
    date: null,
    nickname: null,
    text: null
})

const reducerModel = Record({
    entities: OrderedMap({}),
    loading: false,
    loaded: false
})

export default (state = new reducerModel([]), action) => {
    const {type, payload} = action

    switch (type) {
        // case ADD_MESSAGE_SUCCESS:
        //     return state.setIn(['entities', payload.uid],new MessageModel(payload))
        case FETCH_ALL_REQUEST:
            return state.set('loading', true)
        case FETCH_ALL_SUCCESS:
            return state.set('loaded', true)
                .set('loading', false)
                .set('entities', fbDateToMap(payload, MessageModel))
        default:
            return state
    }
}
/*
* Selectors
* */
export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const messagesListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
/*
    Action creator
* */
export const addMessage = (message) => ({
    type: ADD_MESSAGE_REQUEST,
    payload: message
})

export const fetchAllMessages = () => ({
    type: FETCH_ALL_REQUEST
})

/*
* Sagas
* */
export const addMessageSocket = () => eventChannel(emmit => {
    const ref = firebase.database().ref('messages')
    const callback = data => emmit({ data })
    ref.on('value', callback)

    return () => ref.off('value', callback)
})

export const realTimeSyncMessages = function * () {
    const chan = yield call(addMessageSocket)
    while (true)
    {
        const { data } = yield take(chan)
        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        })
    }
}

export const addMessageSaga = function * (action) {
    const ref = firebase.database().ref('messages')
    try {
        const uid = yield call([ref, ref.push], action.payload)
        yield put({
            type: ADD_MESSAGE_SUCCESS,
            payload: {uid, ...action.payload}
        })
    } catch (e) {
        alert(e.message)
    }
}

export const fetchAllMessagesSaga = function * (action) {
    const ref = firebase.database().ref('messages')

    try {
        const data = yield call([ref, ref.once], 'value')
        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        })
    } catch (e) {
        alert(e.message)
    }
}

export const saga = function * () {
    yield spawn(realTimeSyncMessages)

    yield all([
        takeEvery(ADD_MESSAGE_REQUEST, addMessageSaga),
        takeEvery(FETCH_ALL_REQUEST, fetchAllMessagesSaga)
    ])
}
