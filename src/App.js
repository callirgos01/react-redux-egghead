import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux' 
import ReactDOM from 'react-dom';

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

const store = createStore(counter);

store.subscribe(() => {
  ReactDOM.render(<App />);
});

class App extends Component {
  render() {
    return (
      <div className="App">
        {store.getState()}
        <button onClick = { ( ) => {
            store.dispatch({type:'INCREMENT'});
          }} >
          click ME!
        </button>
      </div>
    );
  }
}



export default App;
