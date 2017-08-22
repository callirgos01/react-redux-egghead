
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
/* removed in lesson 8
document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT'});
})
*/
//registerServiceWorker();