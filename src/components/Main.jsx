import React, { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../context";

const Main = ({ children }) => {
  // CONTEXT
  const { setSelectedTodo } = useContext(TodoContext);
  // REF
  const main = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  const handleClick = (e) => {
    if (e.target == main.current) {
      setSelectedTodo(undefined);
    }
  };

  return (
    <div className="relative w-full h-full " ref={main}>
      {children}
    </div>
  );
};

export default Main;
