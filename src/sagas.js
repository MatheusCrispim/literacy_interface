import { all } from 'redux-saga/effects';
import { rootChallengeSaga } from './modules/challenge/sagas/saga';
import { rootContextSaga } from './modules/context/sagas/saga';
import { rootUserSaga } from './modules/user/sagas/saga';


export function* rootSaga() {
    yield all([
        rootContextSaga(),
        rootChallengeSaga(),
        rootUserSaga()
    ])
}