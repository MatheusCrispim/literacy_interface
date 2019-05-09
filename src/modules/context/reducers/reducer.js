import { handleActions } from 'redux-actions';
import {  ContextTypes  } from '../actions/types';

const { GET_CONTEXT, 
    REGISTER_CONTEXT,
    UPATE_CONTEXT,
    DELETE_CONTEXT,
    SUCCESS,
    FAIL } = ContextTypes;

export default handleActions(
    new Map([
        [
            GET_CONTEXT,
            (state, action)=>({})
        ],
        [
            REGISTER_CONTEXT,
            (state, action)=>({loading: true, data:[...state.data]})
        ],
        [
            UPATE_CONTEXT,
            (state, action)=>({loading: true, data:[...state.data]})
        ],        
        [
            DELETE_CONTEXT,
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