import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Todo from './Todo';
import { withRouter } from 'react-router-dom'
import { getVisibleTodos } from '../reducers'

class VisibleTodoList extends Component {
  fetchData() {
    const { filter, fetchTodos } = this.props;
      return fetchTodos(filter);
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
    const { toggleTodo, ...rest} = this.props
    return <TodoList 
            { ...rest } 
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
    filter,
  };
}

export default withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

