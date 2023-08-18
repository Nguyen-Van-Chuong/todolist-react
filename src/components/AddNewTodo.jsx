import React, { useContext, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";
import Modal from "./Modal";
import { calendarItems } from "../constants";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import { AuthContext } from "../context/AuthContext";

const AddNewTodo = () => {
  // context
  const { selectedProject, projects } = useContext(TodoContext);
  const { currentUser } = useContext(AuthContext);

  // state
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);
  // random color
  function randomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (text && !calendarItems.includes(todoProject)) {
      const addFirebase = async () => {
        const docRef = await addDoc(collection(db, "todos"), {
          userId: currentUser.uid,
          text: text,

          date: moment(day).format("MM/DD/YYYY"),
          day: moment(day).format("d"),
          time: moment(time).format("hh:mm A"),
          checked: false,
          color: randomHexColor(),
          projectName: todoProject,
        });
      };
      setLoading(true);
      setTimeout(() => {
        addFirebase();
        setShowModal(false);
        setText("");
        setDay(new Date());
        setTime(new Date());
        setLoading(false);
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        toast.error("Add Todo unsuccessful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
      }, 2000);
    }
  }
  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="border-b-[1px] border-gray-200 p-4">
      <button
        className={`bg-blue-600 h-[70px] w-full rounded text-base font-bold text-white hover:opacity-60 transition-all ${
          currentUser ? "visible" : "invisible"
        }`}
        onClick={() => setShowModal(true)}
      >
        + New Todo
      </button>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          heading="Add new todo form"
          hanleSubmit={handleSubmit}
          projects={projects}
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          time={time}
          setTime={setTime}
          showButtons="true"
          setShowModal={setShowModal}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default AddNewTodo;
