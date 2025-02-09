import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../features/todoSlice';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (editedText.trim() !== todo.text) {
      dispatch(updateTodo({ ...todo, text: editedText }));
    }
    setIsEditing(false);
  };

  const handleToggle = () => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded bg-white">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="h-4 w-4"
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          className="flex-1 p-1 border rounded"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="px-2 py-1 text-red-500 hover:bg-red-100 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;