import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setFilter, FilterStatus } from "../filter/filterSlice";

const options: { label: string; value: FilterStatus }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Chưa hoàn thành", value: "incomplete" },
];

export default function FilterButtons() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.filter);

  return (
    <div className="flex gap-2 mb-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => dispatch(setFilter(opt.value))}
          className={`px-3 py-1 rounded
              ${
                currentFilter === opt.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}