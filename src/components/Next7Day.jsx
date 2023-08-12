import moment from "moment/moment";
import React, { useEffect, useState } from "react";

import Todo from "./Todo";

const Next7Day = ({ todos }) => {
  // STATE
  const [weekTodos, setWeekTodos] = useState([]);

  useEffect(() => {
    const days = ["0", "1", "2", "3", "4", "5", "6"];
    const sortedTodosByDay = days.map((day) => {
      return {
        todos: todos.filter((todo) => todo.day === day),
        number: day,
      };
    });

    const today = parseInt(moment().format("d"));

    const arrangeDays = sortedTodosByDay
      .slice(today)
      .concat(sortedTodosByDay.slice(0, today));
    setWeekTodos(arrangeDays);
  }, [todos]);
  return (
    <div>
      {weekTodos.map((day) => (
        <div className="" key={day.number}>
          <div className="day flex mr-1.5">
            <div className="text-base font-bold name">
              {moment(day.number, "d").format("dddd")}
              {day.number === moment().format("d") && " (today)"}
            </div>
            <div className="total-todos ml-2.5">({day.todos.length})</div>
          </div>
          <div className="todos">
            {day.todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Next7Day;
