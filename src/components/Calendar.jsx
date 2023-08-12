import React, { useContext, useState } from "react";
import { CalendarDate, CaretUp } from "react-bootstrap-icons";
import { calendarItems } from "../constants/index";
import { TodoContext } from "../context";
import { useSpring, animated } from "react-spring";

const Calendar = () => {
  // STATE
  const [showMenu, setShowMenu] = useState(true);
  const { setSelectedProject } = useContext(TodoContext);
  // ANIMATION
  const spin = useSpring({
    transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
    config: { friction: 10 },
  });
  const menuAnimation = useSpring({
    display: showMenu ? "block" : "none",
    lineHeight: showMenu ? 2 : 0,
  });
  return (
    <div className="p-4 border-b-2 border-blue-100">
      <div className="flex items-center">
        <div className="flex items-center flex-1">
          <CalendarDate />
          <p className="ml-1.5 font-bold text-[1.1rem]">Calendar</p>
        </div>
        <animated.div style={spin} onClick={() => setShowMenu(!showMenu)}>
          <div className="rounded-[50%] cursor-pointer w-6 h-6 flex items-center justify-center hover:bg-slate-100 transition-all">
            <CaretUp />
          </div>
        </animated.div>
      </div>

      <animated.div style={menuAnimation} className="p-[1.5rem]">
        {calendarItems.map((item) => (
          <div
            className="cursor-pointer "
            style={{ padding: "8px" }}
            key={item}
            onClick={() => setSelectedProject(item)}
          >
            {item}
          </div>
        ))}
      </animated.div>
    </div>
  );
};

export default Calendar;
