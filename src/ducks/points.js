import { eventChannel } from 'redux-saga';
import { all, takeEvery, put, call, spawn, take, select } from 'redux-saga/effects';
import { Record, List } from 'immutable';
import firebase from 'firebase';
import { SIGN_IN_SUCCESS } from './user';

const ReducerRecord = Record({
    points: new List([])
});

const PointModel = Record({
    point: null
});
export const moduleName = 'points';

const SEND_POINT_REQUEST = `${moduleName}/SEND_POINT_REQUEST`;
const DELETE_POINT_REQUEST = `${moduleName}/DELETE_POINT_REQUEST`;
const DELETE_POINT_SUCCESS = `${moduleName}/DELETE_POINT_SUCCESS`;
const SEND_POINT_SUCCESS = `${moduleName}/SEND_POINT_SUCCESS`;
const LOAD_ALL_POINTS_SUCCESS = `${moduleName}/LOAD_ALL_POINTS_SUCCESS`;
const LOAD_ALL_POINTS_START = `${moduleName}/LOAD_ALL_POINTS_START`;
const FETCH_POINT = `${moduleName}/FETCH_POINT`;

export default (state = new ReducerRecord(), action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_ALL_POINTS_SUCCESS:
        case FETCH_POINT:
            return state.set('points', new List(Object.values(payload || {})));
        case DELETE_POINT_SUCCESS:
            return new ReducerRecord();
        default:
            return state;
    }
};

export const sendPoint = (user, x, y) => ({
    type: SEND_POINT_REQUEST,
    payload: { user, x, y }
});

export const deletePoints = () => ({
    type: DELETE_POINT_REQUEST
});
export const loadPoints = () => ({
    type: LOAD_ALL_POINTS_START
});

const addPointSocket = () =>
    eventChannel(emmit => {
        const ref = firebase.database().ref('points');
        const callback = data => emmit({ data });
        ref.on('value', callback);

        return () => ref.off('value', callback);
    });

const realTimePointSync = function*() {
    yield take(SIGN_IN_SUCCESS);

    const chan = yield call(addPointSocket);
    while (true) {
        const { data } = yield take(chan);
        const state = yield select();
        console.log('data', data.val());
        const userEmail = state.user.user && state.user.user.email;
        if (data.email !== userEmail)
            yield put({
                type: FETCH_POINT,
                payload: data.val()
            });
    }
};

const sendPointSaga = function*(action) {
    const ref = firebase.database().ref('points');

    try {
        yield call([ref, ref.push], action.payload);
    } catch (e) {
        alert(e.message);
    }
};

const deletePointsSaga = function*(action) {
    const ref = firebase.database().ref('points');

    try {
        yield call([ref, ref.remove]);
        yield put({
            type: DELETE_POINT_SUCCESS
        });
    } catch (e) {
        alert(e.message);
    }
};

const loadPointsSaga = function*() {
    const ref = firebase.database().ref('points');

    try {
        const data = yield call([ref, ref.once], 'value');
        yield spawn(realTimePointSync);

        yield put({
            type: LOAD_ALL_POINTS_SUCCESS,
            payload: data.val()
        });
    } catch (e) {
        alert(e.message);
    }
};
export const saga = function*() {
    yield spawn(realTimePointSync);

    //yield takeEvery(LOAD_ALL_POINTS_START, loadPointsSaga);
    yield all([takeEvery(SEND_POINT_REQUEST, sendPointSaga)]);
    yield all([takeEvery(DELETE_POINT_REQUEST, deletePointsSaga)]);
};
