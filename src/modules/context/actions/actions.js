import { createAction } from 'redux-actions'; 
import { ContextTypes } from './types';

const { GET_CONTEXT, 
        REGISTER_CONTEXT,
        UPATE_CONTEXT,
        DELETE_CONTEXT,
        SUCCESS,
        FAIL } = ContextTypes

export const getContext = createAction(GET_CONTEXT);
export const registerContext = createAction(REGISTER_CONTEXT);
export const updateContext = createAction(UPATE_CONTEXT);
export const deleteContext = createAction(DELETE_CONTEXT);
export const success = createAction(SUCCESS);
export const fail = createAction(FAIL);
