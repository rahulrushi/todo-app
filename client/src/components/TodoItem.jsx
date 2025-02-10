import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo, fetchTodos } from "../features/todoSlice";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedCompleted, setEditedCompleted] = useState(todo.completed); // Track checkbox state
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    if (editedTitle.trim() !== todo.title || editedCompleted !== todo.completed) {
      await dispatch(updateTodo({ id: todo.id, title: editedTitle, completed: editedCompleted }));
      dispatch(fetchTodos()); // Refresh todos after update
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded bg-white">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 p-1 border rounded"
            autoFocus
          />
          <input
            type="checkbox"
            checked={editedCompleted}
            onChange={(e) => setEditedCompleted(e.target.checked)}
            className="h-4 w-4"
          />
          <button
            onClick={handleUpdate}
            className="px-2 py-1 text-green-500 hover:bg-green-100 rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 text-blue-500 hover:bg-blue-100 rounded"
          >
            Edit
          </button>
        </>
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
