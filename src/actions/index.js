import { v4 } from 'uuid';
import { getIsFetching } from '../reducers';
import * as api from '../api';

//action creators
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id:v4(),
    text
});

export const toggleTodo = (id) => ({
    type:'TOGGLE_TODO',
    id
});

//async action creator
export const fetchTodos = (filter) => (dispatch, getState) => {
    if( getIsFetching(getState(),filter)){
        return Promise.resolve();
    }
    dispatch({
        type: 'FETCH_TODO_REQUEST',
        filter,
    });
    return api.fetchTodos(filter).then(
        response => {
            dispatch({
                type: 'FETCH_TODO_SUCCESS',
                filter,
                response,
            });
        },
        error => {
            dispatch({
                type: 'FETCH_TODO_FAILURE',
                filter,
                message: error.message|| 'something went wrong'
            });
        }
    );
};