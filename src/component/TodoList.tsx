import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import TodoItem from "./TodoItem";
import { reorderTodos } from "../features/todos/todoSlice";
import { FilterStatus } from "../features/filter/filterSlice";
import { useState } from "react";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector<RootState, FilterStatus>((state) => state.filter);
  const dispatch = useDispatch();
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    dispatch(reorderTodos({ startIndex: dragIndex, endIndex: index }));
    setDragIndex(null);
  };

  return (
    <div className="border rounded">
      {filteredTodos.map((todo, index) => (
        <div
          key={todo.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
        >
          <TodoItem todo={todo} index={index} />
        </div>
      ))}
    </div>
  );
}
