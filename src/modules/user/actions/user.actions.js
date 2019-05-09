import { createAction } from 'redux-actions'; 
import { UserTypes } from './types';

const { SIGNUP, LOGIN, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } = UserTypes;

export const signup = createAction(SIGNUP);
export const login = createAction(LOGIN);
export const signupSuccess = createAction(SIGNUP_SUCCESS);
export const signupFail = createAction(SIGNUP_FAIL);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginfail= createAction(LOGIN_FAIL);
