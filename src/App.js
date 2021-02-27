import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 0; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할일${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': //할일 추가
      // {type:'INSERT', todo:{id:1, text:'todo', checked:false}}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // {type:'REMOVE', id:1}
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // {type:'TOGGLE,id:1}
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  // 할 일 추가하기
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1; //nextId 1씩 더하기
  }, []);

  // 할 일 삭제하기
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  // 할 일 수정하기
  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
