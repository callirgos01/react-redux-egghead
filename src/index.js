import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux' 
//import { createStore } from 'redux' 

const { Component } = React;
/* lesson 5 */
//counter reducer
const counter = (state = 0, action) => {
    switch( action.type ) {
        case 'INCREMENT':
            return  state + 1;       
        case 'DECREMENT':
            return  state - 1;          
        default:
            return state;
    }
}
/* lesson 9 more counter helper functions */
const addCounter = (list) => {
  return [
    ...list, 
    0];
};

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index+1) 
  ];
}

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index]+1,
    ...list.slice(index+1) 
  ];
}

/* lesson 10 todo pure functions */
const toggleTodo = (todo) => {
  return Object.assign({}, todo, { 
    completed: !todo.completed
  });
};

/* lesson 11 todo reducer */
/* lesson 12 break out reducers per responsbilities */
const todo = (state, action) => {
  switch(action.type) {
      case 'ADD_TODO':        
        return {
              id:action.id,
              text:action.text,
              completed:false
           };
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
          return state;
      }
      return {
        ...state,
        completed:!state.completed
      };
    default:
      return state;
  }
}
const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':        
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
//lesson 14
const visibilityFilter = (
    state = 'SHOW_ALL',
    action ) => {
        switch(action.type){
            case 'SET_VISIBILITY_FILTER':
                return action.filter;
            default:
                return state;
        }
};
//lesson 14
/*const oneAppForAllExamples = (state={},action) => {
    return {
        todo: todos(
            state.todo,
            action
        ),
        visibilityFilter: visibilityFilter( 
            state.visibilityFilter, 
            action
        ),
        counter: counter(
            state.counter,
            action
        )

    };
};*/

//lesson 16
//implement combineReducers from scratch ?!?!?!?!?
//Object.keys is stil confusing.
//where does the reduce operation comes from?
/*const combineReducers = (reducers) => {
    return (state={}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                );
                return nextState;
            },
            {}
        );
    };
};*/
//lesson 15
const oneAppForAllExamples = combineReducers({
    todos,
    visibilityFilter,
    counter
});



/*lesson 7 create creatStore from scratch*/
/*const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () =>{
        return state;
    }

    const dispatch = (action) =>{
        state = reducer(state, action);
        listeners.forEach( listener => listener() );
    }

    const subscribe = (listener) =>{
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }

    dispatch({});
    return { getState, dispatch, subscribe };
}*/
/*lesson 8 use react to render*/
const Counter = ( {
    value,
    onIncrement,
    onDecrement
    }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);
const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if( filter === currentFilter){
        return <span>{children}</span>
    }
    return (
        <a href='#'
            onClick={ e => {
                e.preventDefault();
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                });
            }}
        >
            {children}
        </a>
    );   
}
const getVisibleTodos = (
    todos,
    filter
) => {
    switch(filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        default:
            return todos
    }

}
let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        const{
            todos,
            visibilityFilter
        } = this.props
        const visibleTodos = getVisibleTodos( 
            todos,
            visibilityFilter
        );
        return (
             <div>
                <input ref={node =>{
                    this.input = node;
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type:'ADD_TODO', 
                        text:this.input.value, 
                        id: nextTodoId++ 
                        });
                    this.input.value='';
                    }}>
                    add todo
                </button>
                <ul>    
                    { visibleTodos.map( todo => 
                        <li key={todo.id}
                            onClick={()=>{
                                store.dispatch({
                                    type: 'TOGGLE_TODO', //lesson 18
                                    id:todo.id
                                });
                            }}
                            style = {{ textDecoration:
                                todo.completed?
                                'line-through':
                                'none'
                        }}>
                            {todo.id+1}. {todo.text}
                        </li>) 
                    }
                </ul>
                <p>
                    Show:
                    {' '}
                    <FilterLink
                        filter='SHOW_ALL'
                        currentFilter={visibilityFilter}
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter='SHOW_ACTIVE'
                        currentFilter={visibilityFilter}
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter='SHOW_COMPLETED'
                        currentFilter={visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        );
    }
}

/*lesson 6*/
//const store = createStore(counter);
//lesson 14

const store = createStore(oneAppForAllExamples);
console.log(store.getState());
/*
store.dispatch({
    type:'ADD_TODO',
    id: nextTodoId++,
    text:'Learn Redux'
});
console.log(store.getState());
store.dispatch({
    type:'ADD_TODO',
    id: nextTodoId++,
    text:'???'
});
console.log(store.getState());
store.dispatch({
    type:'ADD_TODO',
    id: nextTodoId++,
    text:'Profit'
});
console.log(store.getState());
store.dispatch({
    type:'TOGGLE_TODO',
    id: 2,
});
console.log(store.getState());

store.dispatch({
    type:'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
});

console.log(store.getState().todo);
*/
const render = () => {        
    ReactDOM.render(
        <div>
            <Counter 
                value = {store.getState().counter}
                onIncrement = {() => store.dispatch({type:'INCREMENT'})}
                onDecrement = {() => store.dispatch({type:'DECREMENT'})}
            />
            <TodoApp 
                {...store.getState()}
            />
        </div>, 
        document.getElementById('root')
    );
}


store.subscribe(render);
render();



/* removed in lesson 8
document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'});
})
*/
//registerServiceWorker();