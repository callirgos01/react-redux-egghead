import expect from 'expect';

expect(
    counter(0, {type:'INCREMENT'})
).toEqual(1);


expect(
    counter(1, {type:'INCREMENT'})
).toEqual(2);

expect(
    counter(2, {type:'DECREMENT'})
).toEqual(1);

expect(
    counter(1, {type:'DECREMENT'})
).toEqual(0);

expect(
    counter(undefined, {})
).toEqual(0);

console.log('Counter Test passed!');


const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);
  
  expect(
    addCounter(listBefore),
  ).toEqual(listAfter);
}

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];
  
  deepFreeze(listBefore);
  
  expect(
    removeCounter(listBefore, 1),
  ).toEqual(listAfter);
  
}
const testIncrementCounter =() => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];
  
  deepFreeze(listBefore);
  
  expect(
    incrementCounter(listBefore, 1),
  ).toEqual(listAfter);
      
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();

console.log('add remove increment All tests passed')


const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };
  
  
  deepFreeze(todoBefore);
  
  expect(
    toggleTodo(todoBefore)
   ).toEqual(todoAfter);
  
};

testToggleTodo();

console.log("toggle todo tests pass passed")



const testTodos = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {      
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);  
}

const testToggleTodo = () => {
  const stateBefore = [
    {      
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {      
      id: 1,
      text: '???',
      completed: false
    }
  ];
  
  const action = {
    type: 'TOGGLE_TODO',
    id: 1,
  };
  const stateAfter = [
    {      
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {      
      id: 1,
      text: '???',
      completed: true
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(action);
  
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);  
}


testTodos();
testToggleTodo();
console.log("todo reducer tests done");