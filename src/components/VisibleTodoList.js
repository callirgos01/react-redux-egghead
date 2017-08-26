import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Todo from './Todo';
import { withRouter } from 'react-router-dom'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
import FetchError from './FetchError'

class VisibleTodoList extends Component {
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then( () => console.log('done!'));
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
        this.fetchData();
    }
  }
  render(){
    const { isFetching, errorMessage, toggleTodo, todos } = this.props
    if( isFetching && !todos.length ) {
      return <p>Loading...</p>;
    }
    if( errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={()=>this.fetchData()}
        />
      );
    }
    return <TodoList 
            todos={todos} 
            onTodoClick={toggleTodo} 
          />;
  }
}
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

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || "all"
  return {    
    todos: getVisibleTodos( state, filter ),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
}

export default withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

