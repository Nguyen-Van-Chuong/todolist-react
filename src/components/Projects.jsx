import React, { useContext, useState } from "react";
import Project from "./Project";
import AddNewProject from "./AddNewProject";
import { CaretUp, Palette, PencilFill } from "react-bootstrap-icons";

import { useSpring, animated } from "react-spring";

import { TodoContext } from "../context";

const Projects = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColor = edit ? "#1EC94C" : "#00000";

  // CONTEXT
  const { projects } = useContext(TodoContext);
  // ANIMATION
  const spin = useSpring({
    transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
    config: { friction: 10 },
  });
  const menuAnimation = useSpring({
    display: showMenu ? "block" : "none",
    lineHeight: showMenu ? 1.2 : 0,
  });
  return (
    <div className="p-4 border-b-2 border-blue-200">
      <div className="flex items-center header">
        <div className="flex items-center flex-1">
          <Palette size={18} className="mr-1.5 " />
          <p>Projects</p>
        </div>
        <div className="btns">
          {showMenu && projects.length > 0 && (
            <span onClick={() => setEdit(!edit)}>
              <PencilFill
                size={15}
                color={pencilColor}
                className="mr-1.5 cursor-pointer"
              />
            </span>
          )}
        </div>
        <AddNewProject></AddNewProject>
        <animated.span style={spin} onClick={() => setShowMenu(!showMenu)}>
          <CaretUp />
        </animated.span>
      </div>
      <animated.div style={menuAnimation} className="p-4">
        {projects.map((project) => (
          <Project project={project} key={project.id} edit={edit}></Project>
        ))}
      </animated.div>
    </div>
  );
};

export default Projects;
