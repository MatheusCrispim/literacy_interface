import { createAction } from 'redux-actions'; 
import { ChallengeTypes } from './types';

const { GET_CHALLENGE, 
        REGISTER_CHALLENGE,
        UPATE_CHALLENGE,
        DELETE_CHALLENGE,
        SUCCESS,
        FAIL } = ChallengeTypes

export const getChallenge = createAction(GET_CHALLENGE);
export const registerChallenge = createAction(REGISTER_CHALLENGE);
export const updateChallenge = createAction(UPATE_CHALLENGE);
export const deleteChallenge = createAction(DELETE_CHALLENGE);
export const success = createAction(SUCCESS);
export const fail = createAction(FAIL);
