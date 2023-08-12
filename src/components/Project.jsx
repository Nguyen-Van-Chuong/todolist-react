import React, { useContext, useState } from "react";
import RenameProject from "./RenameProject";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import { TodoContext } from "../context";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSpring, animated, useTransition } from "react-spring";

const Project = ({ project, edit }) => {
  // CONTEXT
  const { setSelectedProject, defaultProject } = useContext(TodoContext);

  // state
  const [showModal, setShowModal] = useState(false);
  // ANIMATE

  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: 0 },
    to: { marginTop: "0px", opacity: 1 },
  });
  const btnTransitions = useTransition(edit, {
    from: { opacity: 0, transform: "translateX(-20px)" },
    enter: { opacity: 1, transform: "translateX(0px)" },
    leave: { opacity: 0, transform: "translateX(-20px)" },
  });

  async function deleteProject(project) {
    const todosQuery = query(
      collection(db, "todos"),
      where("projectName", "==", project.name)
    );
    const todosSnapshot = await getDocs(todosQuery);
    todosSnapshot.forEach(async (todoDoc) => {
      await deleteDoc(todoDoc.ref);
    });
    await deleteDoc(doc(db, "projects", project.id));
    setSelectedProject(defaultProject);
  }

  return (
    <animated.div style={fadeIn} className="flex m-1.5 p-2">
      <div
        className="flex-1 cursor-pointer "
        onClick={() => setSelectedProject(project.name)}
      >
        {project.name}
      </div>
      <div className="relative flex items-center btns gap-x-1">
        {btnTransitions((props, edit) =>
          edit ? (
            <animated.div
              style={{ ...props }}
              className="flex items-center edit-delete gap-x-1"
            >
              <span className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#acffac] ">
                <Pencil
                  size="13"
                  className="cursor-pointer"
                  onClick={() => setShowModal(true)}
                />
              </span>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#ffacac]"
                onClick={() => deleteProject(project)}
              >
                <XCircle size={13} className="cursor-pointer" />
              </span>
            </animated.div>
          ) : project.numOfTodos === 0 ? (
            ""
          ) : (
            <animated.div
              style={{ ...props }}
              className="absolute right-0 flex items-center justify-center w-6 h-6 rounded-full total-todos bg-slate-200 text-[0.9rem]"
            >
              {project.numOfTodos}
            </animated.div>
          )
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </animated.div>
  );
};

export default Project;
