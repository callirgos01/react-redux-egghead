import { combineReducers } from 'redux';

const createList = (filter) => {
    const ids = (state = [], action) => {
        switch(action.type) {
            case 'FETCH_TODO_SUCCESS':
                return filter === action.filter ?
                    action.response.result :
                    state;
            case 'ADD_TODO_SUCCESS':
                return filter !== 'completed' ? 
                    [...state, action.response.result] :
                    state;
            default:
                return state;
        }
    };
    const isFetching = (state = false, action ) => {
        if(action.filter !== filter){  
            return state;
        }   
        switch(action.type) {
            case 'FETCH_TODO_REQUEST':
                return true;
            case 'FETCH_TODO_SUCCESS':
            case 'FETCH_TODO_FAILURE':
                return false;
            default:
                return false;
        }
    };
    const errorMessage = (state = null, action) => {
        if(action.filter !== filter){  
            return state;
        }   
         switch(action.type) {
            case 'FETCH_TODO_FAILURE':
                return action.message;
            case 'FETCH_TODO_REQUEST':
            case 'FETCH_TODO_SUCCESS':
                return null;
            default:
                return state;
        }
    }
    return combineReducers({
        ids,
        isFetching,
        errorMessage,
    });
}
export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;