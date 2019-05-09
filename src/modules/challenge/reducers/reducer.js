import { handleActions } from 'redux-actions';
import {  ChallengeTypes  } from '../actions/types';

const { 
    GET_CHALLENGE, 
    REGISTER_CHALLENGE,
    UPATE_CHALLENGE,
    DELETE_CHALLENGE,
    SUCCESS,
    FAIL } = ChallengeTypes;

export default handleActions(
    new Map([
        [
            GET_CHALLENGE,
            (state, action)=>({})
        ],
        [
            REGISTER_CHALLENGE,
            (state, action)=>({loading: true, data:[...state.data]})
        ],
        [
            UPATE_CHALLENGE,
            (state, action)=>({loading: true, data:[...state.data]})
        ],        
        [
            DELETE_CHALLENGE,
            (state, action)=>({loading: true, data:[...state.data]})
        ],
        [
            SUCCESS,
            (state, action)=>({loading: false, data:[...action.payload.data]})
        ],
        [
            FAIL,
            (state, action)=>({loading: false, data:[...action.payload.data]})
        ]
    ]),
    {loading: false, data:[]}
);