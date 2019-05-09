import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { Service } from '../../../services/service';
import { ChallengeTypes } from '../actions/types';
import { success, fail } from '../actions/actions';

const { get, post, update, del } = new Service();
const endpoint = '/challenges';

const { GET_CHALLENGE, 
        REGISTER_CHALLENGE,
        UPATE_CHALLENGE,
        DELETE_CHALLENGE
    } = ChallengeTypes;


export function* rootChallengeSaga(){
    yield all([
        takeLatest(GET_CHALLENGE, getChallengeSaga),
        takeLatest(REGISTER_CHALLENGE, registerChallengeSaga),
        takeLatest(UPATE_CHALLENGE, updateChallengeSaga),
        takeLatest(DELETE_CHALLENGE, deleteChallengeSaga)
    ]);
}


function* getChallengeSaga(action){
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


function* registerChallengeSaga(action){
    try{

        let data = yield select(state => state.challenge.data);
        let response = yield call(post, endpoint, action.payload);

        if(response.status === 201){
            data.unshift(response.data);
            let payload = {data};
            yield put(success(payload));
        }else{
            let payload = {data};
            yield put(fail(payload));
        }

    }catch(error){}
}


function* updateChallengeSaga(action){
    try{
        let data = yield select(state => state.challenge.data)    
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

    }catch(error){
        console.log(error)
    }
}


function* deleteChallengeSaga(action){
    try{
        let data = yield select(state => state.challenge.data)    
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