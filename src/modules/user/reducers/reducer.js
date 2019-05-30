import { handleActions } from 'redux-actions';
import { UserTypes } from '../actions/types';
import { redirect } from '../../../utils/url.utils';
import { setToken } from '../../../utils/user.utils';

//Types
const { 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN, 
    SIGNUP, 
    GET_USER,
    GET_USER_SUCCESS } = UserTypes;

export default handleActions(
    new Map([
      [
        LOGIN,
        (state, action) => ({loginFeedback: state.loginFeedback, loading: true, userData:{} })
      ], 
      [
        SIGNUP,
        (state, action) => ({signupFeedback: state.loginFeedback, loading: true, userData:{} })
      ],
      [
        GET_USER,
        (state, action) => ({loginFeedback: state.loginFeedback, loading: true, userData:{} })
      ],
      [
        SIGNUP_SUCCESS,
        (state, action) => {
            return {signupFeedback: '', loading: false, userData:{} }
        }
      ],
      [
        SIGNUP_FAIL,
        (state, action) => {
            return {signupFeedback: action.payload, loading: false, userData:{} }
        }
      ], 
      [
        LOGIN_SUCCESS,
        (state, action) => {
          const { token } = action.payload;
          setToken(token);
          redirect('/dashboard');
          return {loginFeedback: '', loading: false, userData:{} }
        }
      ], 
      [
        LOGIN_FAIL,
        (state, action) => ({loginFeedback: action.payload, loading: false, userData:{}})
      ],
      [
        GET_USER_SUCCESS,
        (state, action) => ({loginFeedback: '', loading: false, userData:action.payload.userData})
      ]

    ]),
    { loginFeedback: '', signupFeedback: '',  loading: false, userData:{}}
);