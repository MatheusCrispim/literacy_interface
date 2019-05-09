import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Service } from '../../../services/service';
import { UserTypes } from '../actions/types';
import { loginSuccess, loginfail, signupSuccess, signupFail } from '../actions/user.actions';
const { LOGIN, SIGNUP } = UserTypes;

const { get, post, update, del } = new Service();
const endpoint = '/users';

export function* rootUserSaga(){
    yield all([
        takeLatest(LOGIN, loginUserSaga),
        takeLatest(SIGNUP, signupUserSaga)
    ]);
}

function* loginUserSaga(action){       
    try{
        let response = yield call(post, endpoint, action.payload);
        
        if(response.status === 200){
            let { token } = response;
            yield put(loginSuccess(token));
        }else{
            yield put(loginfail("Credenciais do inválidas"));
        }

    }catch(error){/*Do error handling after*/}
}


function* signupUserSaga(action){
    try{
        console.log(action.payload)
        let response = yield call(post, endpoint, action.payload);
        
        if(response.status === 201){
            yield put(signupSuccess());
        }else{
            let { createAccount } =  response;

        }

    }catch(error){/*Do error handling after*/}
}