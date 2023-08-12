import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import TodoForm from "./TodoForm";
// import { projects } from "../constants";
import { TodoContext } from "../context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditTodo = () => {
  // STATE
  // const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState();
  // CONTEXT
  const { selectedTodo, projects } = useContext(TodoContext);
  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, "MM/DD/YYYY").toDate());
      setTime(moment(selectedTodo.time, "hh:mm A").toDate());
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);
  useEffect(() => {
    if (selectedTodo) {
      const todoRef = doc(db, "todos", selectedTodo.id);
      const updateTodo = async () => {
        await updateDoc(todoRef, {
          text: text,
          date: moment(day).format("MM/DD/YYYY"),
          day: moment(day).format("d"),
          time: moment(time).format("hh:mm A"),
          projectName: todoProject,
        });
      };
      updateTodo();
    }
  }, [text, day, time, todoProject]);
  return (
    <>
      {selectedTodo && (
        <div className="absolute bottom-10 left-[530px] h-[80%] opacity-[0.9]">
          <TodoForm
            heading="Edit todo"
            hanleSubmit={handleSubmit}
            projects={projects}
            text={text}
            setText={setText}
            day={day}
            setDay={setDay}
            time={time}
            setTime={setTime}
            todoProject={todoProject}
            setTodoProject={setTodoProject}
          />
        </div>
      )}
    </>
  );
};

export default EditTodo;
