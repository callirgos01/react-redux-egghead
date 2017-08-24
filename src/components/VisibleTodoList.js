import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import Todo from './Todo';
import { withRouter } from 'react-router-dom'
import { getVisibleTodos } from '../reducers'

const VisibleTodoList = ({
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

const mapStateToProps = (state, { match }) => ({
    todos: getVisibleTodos(
        state,
        match.params.filter || "all"
    ),
});

export default withRouter(connect(
    mapStateToProps,
    { onTodoClick: toggleTodo }
)(VisibleTodoList));

