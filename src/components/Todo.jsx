import React, { useContext, useState } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";

import { useSpring, animated, useTransition } from "react-spring";
import { db } from "../firebase";
import moment from "moment";
import { TodoContext } from "../context";

const Todo = ({ todo }) => {
  // STATE
  const [hover, setHover] = useState(false);
  // CONTEXT
  const { setSelectedTodo, selectedTodo } = useContext(TodoContext);
  // ANIMATE
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: 0 },
    to: { marginTop: "0px", opacity: 1 },
  });
  const checkTransitions = useTransition(todo.checked, {
    from: { position: "absolute", transform: "scale(0)" },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0)" },
  });

  const handleDelete = (todo) => {
    deleteTodo(todo.id);
    if (selectedTodo === todo) {
      setSelectedTodo(undefined);
    }
  };
  async function deleteTodo(id) {
    await deleteDoc(doc(db, "todos", id));
  }
  async function checkTodo(todo) {
    const todoRef = doc(db, "todos", todo.id);
    await updateDoc(todoRef, {
      checked: !todo.checked,
    });
  }
  async function nextRepeatNextDay({ id, ...todo }) {
    const nextDayDate = moment(todo.date, "MM/DD/YYYY").add(1, "days");

    await addDoc(collection(db, "todos"), {
      ...todo,
      checked: false,
      date: nextDayDate.format("MM/DD/YYYY"),
      day: nextDayDate.format("d"),
    });
  }
  return (
    <animated.div style={fadeIn} className="flex px-4 py-2 todo">
      <div
        className="flex items-center w-full todo-container"
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
      >
        <span
          className="flex items-center justify-center"
          onClick={() => checkTodo(todo)}
        >
          {checkTransitions((props, checked) =>
            checked ? (
              <animated.span style={props}>
                <CheckCircleFill color="#bebebe" />
              </animated.span>
            ) : (
              <animated.span style={props}>
                <Circle color={todo.color} />
              </animated.span>
            )
          )}
        </span>

        <div
          className="relative flex-1 text mx-[10px]"
          onClick={() => setSelectedTodo(todo)}
        >
          <p
            className="name"
            style={{ color: todo.checked ? "#bebebe" : "#000000" }}
          >
            {todo.text}
          </p>
          <span className="text-[0.8rem]">
            {todo.time} -
            <span className="capitalize"> {todo.projectName} </span>-{" "}
            {todo.date}
          </span>
          <div
            className={`line bg-black absolute top-1/4 ${
              todo.checked ? "h-[1px] w-full" : ""
            }`}
          ></div>
        </div>
        <div className=" add-to-next-day mr-[10px]">
          {todo.checked && (
            <span>
              <ArrowClockwise onClick={() => nextRepeatNextDay(todo)} />
            </span>
          )}
        </div>
        <div className="delete-todo">
          {(hover || todo.checked) && (
            <span className="cursor-pointer" onClick={() => handleDelete(todo)}>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default Todo;
