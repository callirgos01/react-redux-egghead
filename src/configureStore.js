
import { createStore } from 'redux';
import todoApp from './reducers';

const logger = (store) => (next) => {
    if( !console.group){
        return next;
    }
    return (action) => {
        console.group( action.type );
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green',  store.getState());        
        console.groupEnd(action.type);
        return returnValue;
    }
}

const promise = (store) => (next) => (action) => {
    if( typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
}
const configureStore = () => {    
    const store = createStore( todoApp );
    const middlewares = [promise];

    if( process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }
    const wrapDispatchWithMiddleWares = (store, middlewares) => {
        middlewares.slice().reverse().forEach(middleware => 
            store.dispatch = middleware(store)(store.dispatch)
        );
    }

    wrapDispatchWithMiddleWares(store, middlewares);

    return store; 
};

export default configureStore;