import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) =>{
    let input;
    return (
        <div>
            <input ref={node =>{
                    input = node;
                }} />
                <button onClick={() => {
                    if(input.value.trim()!==""){
                        dispatch(addTodo(input.value));
                        input.value='';
                    }
                }}>
                    add todo
                </button>
        </div>
    );
}
//connect call without any arguments
//will generate a component.
//it does not subscribe to the store
//and it will inject the dispatch prop by default.
export default connect()(AddTodo);