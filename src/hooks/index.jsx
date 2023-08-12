import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment";

export function useTodos(userId) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // const todosRef = collection(db, "todos");
    if (userId !== null && userId !== undefined) {
      // Kiểm tra userId trước khi tạo truy vấn
      const todosRef = query(
        collection(db, "todos"),
        where("userId", "==", userId)
      );
      const unsubcribe = onSnapshot(todosRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(data);
      });
      return () => {
        unsubcribe();
      };
    } else {
      setTodos([]);
    }
  }, [userId]);
  return todos;
}

export function useFilterTodos(todos, selectedProject) {
  // state

  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(() => {
    let data;
    const todayDateFormated = moment().format("MM/DD/YYYY");
    if (selectedProject === "today") {
      data = todos.filter((todo) => todo.date === todayDateFormated);
    } else if (selectedProject === "next 7 days") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "MM/DD/YYYY");
        const todayDate = moment(todayDateFormated, "MM/DD/YYYY");
        const diffDays = todoDate.diff(todayDate, "days");
        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === "all days") {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }
    setFilteredTodos(data);
  }, [todos, selectedProject]);
  return filteredTodos;
}
export function useProjects(userId) {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (userId !== null && userId !== undefined) {
      // const projectsRef = collection(db, "projects");
      const projectsRef = query(
        collection(db, "projects"),
        where("userId", "==", userId)
      );
      const unsubcribe = onSnapshot(projectsRef, (doc) => {
        const data = doc.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
          };
        });
        setProjects(data);
      });
      return () => unsubcribe();
    } else {
      setProjects([]);
    }
  }, [userId]);
  return projects;
}

export function useProjectsWithStats(projects, todos) {
  const [projectsWithStats, setProjectsWithStats] = useState([]);

  useEffect(() => {
    const data = projects.map((project) => {
      return {
        numOfTodos: todos.filter(
          (todo) => todo.projectName === project.name && !todo.checked
        ).length,
        ...project,
      };
    });
    setProjectsWithStats(data);
  }, [projects, todos]);
  return projectsWithStats;
}
