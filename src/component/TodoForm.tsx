import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todoSlice";

export default function TodoForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!value.trim()) {
      setError("Không được để trống công việc!");
      return;
    }
    dispatch(addTodo(value));
    setValue("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-1 mb-4">
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full
             bg-white text-gray-900
             dark:bg-gray-800 dark:text-gray-100
             border-gray-300 dark:border-gray-600"
          placeholder="Thêm công việc..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setError("")}
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
