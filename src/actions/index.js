import { normalize } from 'normalizr';
import * as schema from './schema';

import * as api from '../api';
import { getIsFetching } from '../reducers';

//action creators
export const addTodo = (text) => (dispatch) => 
    api.addTodo(text).then(response => {
        console.log( 
            'normalize reponse'
        )
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response: normalize(response, schema.todo),
        })
    })

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
                response:normalize(response, schema.arrayOfTodos),
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