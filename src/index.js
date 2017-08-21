import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux' 
//import { createStore } from 'redux' 
import { Provider, connect } from 'react-redux'
//const { Component } = React;
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


//action creators
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id:nextTodoId++,
        text
    }
}
const setVisibilityFilter = (filter) => {
    return {
        type:'SET_VISIBILITY_FILTER',
        filter
    }
}

const toggleTodo = (id) => {
    return {
            type:'TOGGLE_TODO',
            id
    }
}

/* lesson 9 more counter helper functions */
/*const addCounter = (list) => {
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
*/
/* lesson 10 todo pure functions */
/*const toggleTodo = (todo) => {
  return Object.assign({}, todo, { 
    completed: !todo.completed
  });
};
*/
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
/*const Counter = ( {
    value,
    onIncrement,
    onDecrement
    }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
    );/*
 /*
        visibilityFilter={visibilityFilter}
        onFilterLinkClick={filter => 
            
        }
    */

const Link = ({
    active,
    children,
    onClick
}) => {
    if( active ){
        return <span>{children}</span>
    }
    return (
        <a href="https://google.com"
            onClick={ e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );   
}

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    };
}
const mapDispatchToLinkProps = (dispatch, ownProps) =>{
    return {
        onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
    };
}

//the connect function creates a new component
const FilterLink = connect( 
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

/*class FilterLink extends Component {

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(()=> 
            this.forceUpdate()
        )
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return ( 
            <Link
                active={
                    props.filter === state.visibilityFilter
                }
                onClick={
                }
            >
            {props.children}
            </Link>
        );
    }
}
FilterLink.contextTypes = {
    store: React.PropTypes.object
}
*/
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

/* the connect function gerates this component
class VisibleTodoList extends Component {
    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(()=> 
            this.forceUpdate()
        )
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        //const props = this.context;
        const { store } = this.context;
        const state = store.getState();
        return (
            <TodoList
                todos
                onTodoClick
            />
        );
    }
}
VisibleTodoList.contextTypes = {
    store: React.PropTypes.object
}
*/

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const mapStateTodoListToProps = (state) => {
    return {
        todos: getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
    };
}
const mapDispatchTodoListToProps = (dispatch) => {
    return {
       onTodoClick: (id) => {
                    dispatch(toggleTodo(id))
       }
    }
}

const  VisibleTodoList = connect(
    mapStateTodoListToProps,
    mapDispatchTodoListToProps
)(TodoList);


const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li onClick={onClick}
        style = {{ textDecoration:
            completed?
            'line-through':
            'none'
        }}>
        {text}
    </li>
);

let nextTodoId = 0;

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
AddTodo = connect( )(AddTodo);

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink
            filter='SHOW_ALL'
        >
            All
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_ACTIVE'
        >
            Active
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_COMPLETED'
        >
            Completed
        </FilterLink>
    </p> 
);
const TodoApp = () =>
<div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
</div>

/*lesson 6*/
//const store = createStore(counter);
//lesson 14
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
/*    <Counter 
                value = {store.getState().counter}
                onIncrement = {() => store.dispatch({type:'INCREMENT'})}
                onDecrement = {() => store.dispatch({type:'DECREMENT'})}
            />
          */
/* removing this definition and using the one from react-redux
class Provider extends Component {
    getChildContext() {
        return {
            store: this.props.store
        };
    }
    render(){
        return this.props.children;
    }
}*/
/*
Provider.childContextTypes = {
    store: React.PropTypes.object
}
*/
const render = () => {        
    ReactDOM.render(
        <Provider store={createStore(oneAppForAllExamples)}>
            <TodoApp />
        </Provider>,
        document.getElementById('root')
    );
}

//store.subscribe(render);
render();



/* removed in lesson 8
document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'});
})
*/
//registerServiceWorker();