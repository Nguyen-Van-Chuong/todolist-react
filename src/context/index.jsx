import React, { createContext, useContext } from "react";
import { useState } from "react";
import {
  useFilterTodos,
  useProjects,
  useProjectsWithStats,
  useTodos,
} from "../hooks";
import { AuthContext } from "./AuthContext";
const TodoContext = createContext();

function TodoContextProvider({ children }) {
  // STATE
  const defaultProject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);
  // CONTEXT
  const { currentUser } = useContext(AuthContext);
  // HOOK
  // if (currentUser) {

  // }
  const todos = useTodos(currentUser?.uid);
  const projects = useProjects(currentUser?.uid);
  const projectsWithStats = useProjectsWithStats(projects, todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);

  return (
    <TodoContext.Provider
      value={{
        defaultProject,
        selectedProject,
        setSelectedProject,
        todos: filteredTodos,
        projects: projectsWithStats,
        selectedTodo,
        setSelectedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
