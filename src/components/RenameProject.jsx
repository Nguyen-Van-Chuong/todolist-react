import React, { useContext, useState } from "react";
import ProjectForm from "./ProjectForm";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../context";

const RenameProject = ({ project, setShowModal }) => {
  // CONTEXT
  const { setSelectedProject, defaultProject } = useContext(TodoContext);
  // STATE
  const [newProjectName, setNewProjectName] = useState(project.name);

  const renameProject = async (project, newProjectName) => {
    const projectsRef = collection(db, "projects");
    const todosRef = collection(db, "todos");
    const { name: oldProjectName, id } = project;
    const p = query(projectsRef, where("name", "==", newProjectName));
    const t = query(todosRef, where("projectName", "==", oldProjectName));

    const querySnapshot = await getDocs(p);
    const querySnapshotT = await getDocs(t);

    if (querySnapshot.empty) {
      const projectRef = doc(db, "projects", project.id);
      await updateDoc(projectRef, {
        name: newProjectName,
      });
      // cập nhật tất cả các todos khi đổi name project
      if (querySnapshotT) {
        querySnapshotT.docs.forEach(async (tododoc) => {
          const todoRef = doc(db, "todos", tododoc.id);
          await updateDoc(todoRef, {
            projectName: newProjectName,
          });
        });
      }
      setShowModal(false);
      setSelectedProject(newProjectName);
    } else {
      alert("ton tai");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    renameProject(project, newProjectName);
  }
  return (
    <div>
      <ProjectForm
        handleSubmit={handleSubmit}
        heading={"New project"}
        value={newProjectName}
        setShowModal={setShowModal}
        setValue={setNewProjectName}
        confirmText={"Confirm"}
      ></ProjectForm>
    </div>
  );
};

export default RenameProject;
