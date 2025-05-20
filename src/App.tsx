import TodoForm from "../src/component/TodoForm";
import TodoList from "../src/component/TodoList";
import DarkModeToggle from "./component/DarkModeToggle";
import FilterButtons from "./features/filter/FilterButtons";

function App() {
  return (
    <div className="min-h-screen min-w-screen
                    bg-white text-gray-900
                    dark:bg-gray-900 dark:text-gray-100
                    transition-colors duration-300 p-4
                    flex flex-col items-center relative"
    >
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      <div className="w-full max-w-4xl mt-10">
        <TodoForm />
        <FilterButtons />
        <TodoList />
      </div>
    </div>
  );
}


export default App;
