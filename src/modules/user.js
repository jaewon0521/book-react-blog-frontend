import { createAction, handleActions } from "redux-actions";
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga ,{ createRequestActionTypes } from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';


const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
const [CHECK, CHECK_SUCCESS, CHECK_FALURE] = createRequestActionTypes('user/CHECK'); // 회원 정보 확인

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); // localStorage에서 user를 제거
  } catch (e) {
    console.log('localStorage is not working');
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FALURE, checkFailureSaga);
}

const initialState = {
  user: null,
  checkError: null
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null
    }),
    [CHECK_FALURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      cehckError: error
    })
  },
  initialState
);

