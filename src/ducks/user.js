import {all, call, put, takeEvery, take, spawn} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {push} from 'react-router-redux'
import firebase from 'firebase'
import {Record} from 'immutable'

export const moduleName = 'user'

export const SIGN_IN_REQUEST = `${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`
export const SIGN_UP_REQUEST = `${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_OUT_SUCCESS = `${moduleName}/SIGN_OUT_SUCCESS`
export const SIGN_OUT_REQUEST = `${moduleName}/SIGN_OUT_REQUEST`
export const WATCH_STATUS_REQUEST = `${moduleName}/WATCH_STATUS_REQUEST`

const ReducerRecord = Record({
    user: null,
    error: null,
    loading: false
})

export default (state = new ReducerRecord(), action) => {
    const {type, payload} = action

    switch (type) {
        case WATCH_STATUS_REQUEST:
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
            return state.set('loading', true)
        case SIGN_OUT_SUCCESS:
            return new ReducerRecord()
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return state.set('user', payload)
                .set('loading', false)
        default:
            return state
    }
}

export const signIn = (user) => ({
    type: SIGN_IN_REQUEST,
    payload: user
})


export const signUp = (user) => ({
    type: SIGN_UP_REQUEST,
    payload: user
})

export const signOut = () => ({
    type: SIGN_OUT_REQUEST
})

const signOutSaga = function * (action) {
    const ref = firebase.auth()
    try {
        yield call([ref, ref.signOut])
        yield put({
            type: SIGN_OUT_SUCCESS
        })

    } catch (e) {
        alert(e.message)
    }
}

const signInSaga = function * (action) {
    const ref = firebase.auth()
    try {
        yield call([ref, ref.signInWithEmailAndPassword], action.payload.email, action.payload.password)
        yield put(push('/'))
        yield put({
            type: SIGN_IN_SUCCESS,
            payload: action.payload
        })
    } catch (error) {
        alert(error.message)
        yield put({
            type: SIGN_IN_ERROR,
            error
        })
    }
}

const signUpSaga = function * (action) {
    const ref = firebase.auth()
    try {
        const user = yield call([ref, ref.createUserWithEmailAndPassword], action.payload.email, action.payload.password)
        yield put(push('/'))
        yield put({
            type: SIGN_UP_SUCCESS,
            payload: action.payload
        })
    } catch (error) {
        alert(error.message)
        yield put({
            type: SIGN_UP_ERROR,
            error
        })
    }
}

const createAuthChannel = () => eventChannel(emit => firebase.auth().onAuthStateChanged(user => emit({ user })))

export const watchStatusChange = function * () {
    const chan = yield call(createAuthChannel)
    yield put({
        type: WATCH_STATUS_REQUEST
    })
    while (true) {
        const { user } = yield take(chan)

        if (user) {
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: user
            })
        } else {
            yield put({
                type: SIGN_OUT_SUCCESS,
                payload: user
            })
            //yield put(push('/auth/signin'))
        }
    }
}

export const saga = function * () {
    yield spawn(watchStatusChange)

    yield all([
        takeEvery(SIGN_IN_REQUEST, signInSaga),
        takeEvery(SIGN_UP_REQUEST, signUpSaga),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ])
}
