import React, { useContext } from "react";
import Todo from "./Todo";
import Next7Day from "./Next7Day";
// import { todos } from "../constants";
import { TodoContext } from "../context";

const Todos = () => {
  const { selectedProject, todos } = useContext(TodoContext);

  return (
    <div className="w-[450px] h-[80%] bg-white absolute bottom-10 left-10 rounded p-2 pt-0 opacity-[0.9] overflow-y-auto">
      <div className="my-4 capitalize text-[1.2rem] font-bold pb-0.5 border-blue-100 border-b-2">
        {selectedProject}
      </div>
      <div className="overflow-y-auto">
        {selectedProject === "next 7 days" ? (
          <Next7Day todos={todos}></Next7Day>
        ) : (
          todos.map((todo) => <Todo todo={todo} key={todo.id}></Todo>)
        )}
      </div>
    </div>
  );
};

export default Todos;
