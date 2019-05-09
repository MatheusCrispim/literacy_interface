import { handleActions } from 'redux-actions';
import { UserTypes } from '../actions/types';
import { setToken } from '../../../utils/user.utils';
import { redirect } from '../../../utils/url.utils';

//Types
const { 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN, 
    SIGNUP } = UserTypes;

export default handleActions(
    new Map([
      [
        LOGIN,
        (state, action) => ({loginFeedback: state.loginFeedback, loading: true})
      ], 
      [
        SIGNUP,
        (state, action) => ({signupFeedback: state.loginFeedback, loading: true})
      ],
      [
        SIGNUP_SUCCESS,
        (state, action) => {
            setToken(action.payload);
            redirect('/dashboard');
            return {signupFeedback: '', loading: false}
        }
      ],
      [
        SIGNUP_FAIL,
        (state, action) => {
            return {signupFeedback: action.payload, loading: false}
        }
      ], 
      [
        LOGIN_SUCCESS,
        (state, action) => {
          let { token } = action.payload;
          setToken(token);
          redirect('/');
          return {loginFeedback: '', loading: false}
        }
      ], 
      [
        LOGIN_FAIL,
        (state, action) => ({loginFeedback: action.payload, loading: false})
      ], 
    ]),

    { loginFeedback: '', signupFeedback: '',  loading: false }
  );