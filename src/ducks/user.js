import { all, call, put, takeEvery, take, spawn, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { push } from 'react-router-redux';
import firebase from 'firebase';
import { createSelector } from 'reselect';
import { Record, List } from 'immutable';
import {fbPointsToMap} from './utiles'

export const moduleName = 'user';

export const SIGN_IN_REQUEST = `${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`;
export const SIGN_UP_REQUEST = `${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_OUT_SUCCESS = `${moduleName}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_REQUEST = `${moduleName}/SIGN_OUT_REQUEST`;
export const WATCH_STATUS_REQUEST = `${moduleName}/WATCH_STATUS_REQUEST`;
export const ONLINE = `${moduleName}/ONLINE`;
export const OFFLINE = `${moduleName}/OFFLINE`;
export const USERS_STATUS = `${moduleName}/USERS_STATUS`;

const ReducerRecord = Record({
    user: null,
    users: new List([]),
    error: null,
    loading: false
});

export default (state = new ReducerRecord(), action) => {
    const { type, payload } = action;

    switch (type) {
        case WATCH_STATUS_REQUEST:
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
            return state.set('loading', true);
        case SIGN_OUT_SUCCESS:
            return new ReducerRecord();
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return state.set('user', payload).set('loading', false);
            case USERS_STATUS:
            return state.set('users', fbPointsToMap(payload))
        default:
            return state;
    }
};
/**SELECTORS */

export const userStateSelector = state => state[moduleName];
export const userEmailSelector = createSelector(
    userStateSelector,
    user => user.user.email
);
export const usersSelector = createSelector(userStateSelector, state => state.users.toObject())

/**ACTIONS */
export const signIn = user => ({
    type: SIGN_IN_REQUEST,
    payload: user
});

export const signUp = user => ({
    type: SIGN_UP_REQUEST,
    payload: user
});

export const signOut = () => ({
    type: SIGN_OUT_REQUEST
});

export const online = () => ({
    type: ONLINE
});
export const offline = () => ({
    type: OFFLINE
});

/**SAGAS */
const signOutSaga = function*(action) {
    const ref = firebase.auth();
    try {
        yield call([ref, ref.signOut]);
        yield put({
            type: SIGN_OUT_SUCCESS
        });
    } catch (e) {
        alert(e.message);
    }
};

const signInSaga = function*(action) {
    const ref = firebase.auth();
    const status = firebase.database().ref('statusUsers');
    try {
        yield call([ref, ref.signInWithEmailAndPassword], action.payload.email, action.payload.password);
        yield put(push('/'));
        const userStatus = yield call([status, status.child], btoa(action.payload.email));

        yield call([userStatus, userStatus.set], { isOnline: true });

        yield put({
            type: SIGN_IN_SUCCESS,
            payload: action.payload
        });
    } catch (error) {
        alert(error.message);
        yield put({
            type: SIGN_IN_ERROR,
            error
        });
    }
};

const signUpSaga = function*(action) {
    const ref = firebase.auth();
    try {
        const user = yield call(
            [ref, ref.createUserWithEmailAndPassword],
            action.payload.email,
            action.payload.password
        );
        yield put(push('/'));
        yield put({
            type: SIGN_UP_SUCCESS,
            payload: action.payload
        });
    } catch (error) {
        alert(error.message);
        yield put({
            type: SIGN_UP_ERROR,
            error
        });
    }
};

const createAuthChannel = () => eventChannel(emit => firebase.auth().onAuthStateChanged(user => emit({ user })));

export const watchStatusChange = function*() {
    const chan = yield call(createAuthChannel);
    yield put({
        type: WATCH_STATUS_REQUEST
    });
    while (true) {
        const { user } = yield take(chan);

        if (user) {
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: user
            });
        } else {
            yield put({
                type: SIGN_OUT_SUCCESS,
                payload: user
            });
            //yield put(push('/auth/signin'))
        }
    }
};

const changedStatusSaga = function*({ type }) {
    const userEmai = yield select(userEmailSelector);
    const ref = firebase.database().ref(`statusUsers`);

    try {
        const userStatus = yield call([ref, ref.child], btoa(userEmai));

        yield call([userStatus, userStatus.set], { isOnline: type === ONLINE ? true : false });
    } catch (e) {
        console.log(e.message);
    }
};
const onlineUsersChanel = () =>
    eventChannel(emit =>
        firebase
            .database()
            .ref('statusUsers')
            .on('value', data => emit({ data }))
    );

const onlineUsersSaga = function * () {
    yield take(SIGN_IN_SUCCESS);

    const chan = yield call(onlineUsersChanel);

    while (true) {
        const {data} = yield take(chan);

        yield put({
            type: USERS_STATUS,
            payload: data.val()
        })
    }
}
export const saga = function*() {
    yield spawn(watchStatusChange);
    yield spawn(onlineUsersSaga);

    yield all([
        takeEvery([OFFLINE, ONLINE], changedStatusSaga),
        takeEvery(SIGN_IN_REQUEST, signInSaga),
        takeEvery(SIGN_UP_REQUEST, signUpSaga),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga)
    ]);
};
