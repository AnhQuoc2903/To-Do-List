import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../features/todos/todoSlice";
import { Todo } from "../types/Todo";

export default function TodoItem({ todo, index }: { todo: Todo; index: number }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.content);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!value.trim()) {
      setError("Nội dung không được để trống!");
      return;
    }
    dispatch(editTodo({ id: todo.id, content: value.trim() }));
    setEditing(false);
    setError("");
  };

  return (
    <div
      className="flex items-center justify-between border-b py-2 px-2 
                hover:bg-gray-50 dark:hover:bg-gray-700 transition
                border-gray-300 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 w-full">
        <span className="w-6 text-gray-500 select-none">{index + 1}.</span>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          className="w-5 h-5 cursor-pointer"
        />
        {editing ? (
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            className="border p-1 flex-1 rounded"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {todo.content}
          </span>
        )}
      </div>

      <div className="flex flex-col items-end gap-1 ml-2">
        <div className="flex gap-2">
          {editing ? (
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 transition"
            >
              Lưu
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-yellow-600 hover:text-yellow-800 transition"
            >
              Sửa
            </button>
          )}
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="text-red-600 hover:text-red-800 transition"
          >
            Xoá
          </button>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
}
