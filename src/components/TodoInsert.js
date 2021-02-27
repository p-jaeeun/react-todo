import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  // onclick 이벤트가 아닌 form,submit이벤트를 사용한 이유?
  // onsubmit 이벤트에서는 인풋에서 enter 눌렀을때도 발생하므로!
  // onclick으로하면 onKeyPress 이벤트 따로 처리해줘야함!!
  const onSubmit = useCallback(
    (e) => {
      // submit이벤트는 브라우저에서 새로고침을 발생시키므로
      // 이를 방지하기위해 preventDefault함수 호출!
      e.preventDefault();

      onInsert(value);
      setValue(''); //value값 초기화
    },
    [onInsert, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
