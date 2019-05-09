import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { Service } from '../../../services/service';
import { ContextTypes } from '../actions/types';
import { success, fail } from '../actions/actions';

const { get, post, update, del } = new Service();
const endpoint = '/contexts';

const { GET_CONTEXT, 
        REGISTER_CONTEXT,
        UPATE_CONTEXT,
        DELETE_CONTEXT
    } = ContextTypes;


export function* rootContextSaga(){
    yield all([
        takeLatest(GET_CONTEXT, getContextSaga),
        takeLatest(REGISTER_CONTEXT, registerContextSaga),
        takeLatest(UPATE_CONTEXT, updateContextSaga),
        takeLatest(DELETE_CONTEXT, deleteContextSaga)
    ]);
}


function* getContextSaga(action){

    try{
        let response = call(get, endpoint);

        if(response.status === 200){
            let payload = {};
            put(success(payload));
        }else{
            let payload = {};
            put(fail(payload));
        }

    }catch(error){}

}


function* registerContextSaga(action){
    try{
        let data = yield select(state => state.context.data);
        let response = yield call(post, endpoint, action.payload);

        if(response.status === 201){
            data.unshift(response.data);
            let payload = {data};
            yield put(success(payload));
        }else{
            let payload = {data};
            yield put(fail(payload));
        }

    }catch(error){console.log(error)}
}


function* updateContextSaga(action){
    try{
        let data = yield select(state => state.context.data)    
        let response = yield call(update, `${endpoint}/${action.payload.id}`, action.payload.data);

        if(response.status === 200){
            let index = data.findIndex(item=> action.payload.id === item.id);
            data.splice(index, 1, response.data);

            let payload = {data};
            yield put(success(payload));
        }else{
            let payload = {data};
            yield put(fail(payload));
        }

    }catch(error){}
}


function* deleteContextSaga(action){
    try{
        let data = yield select(state => state.context.data)    
        let response =yield call(del, `${endpoint}/${action.payload}`);

        if(response.status === 200){
            let index = data.findIndex(item=> action.payload === item.id);
            data.splice(index, 1);

            let payload = {data};
            yield put(success(payload));
        }else{
            let payload = {data};
            yield put(fail(payload));
        }

    }catch(error){}
}