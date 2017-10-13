import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) =>{
    let input;
    return (
        <div className="add-todo">
            <input 
                className="add-todo__input"
                ref={node =>{
                    input = node;
                }} 
                placeholder = "new todo"
                onKeyUp = {(e)=>{
                    if(e.keyCode === 13) {
                        if(input.value.trim()!=="") {
                            dispatch(addTodo(input.value));
                            input.value='';
                }}}}
                />
                <button 
                    className="add-todo__button"
                    onClick={() => {
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