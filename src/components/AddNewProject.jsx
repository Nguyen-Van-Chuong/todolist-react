import React, { useContext, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

//
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddNewProject = () => {
  // CONTEXT
  const { currentUser } = useContext(AuthContext);
  // STATE
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setprojectName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName && currentUser) {
      // Check same projectName
      const projectsRef = collection(db, "projects");
      const q = query(
        projectsRef,
        where("name", "==", projectName),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setLoading(true);
        await addDoc(projectsRef, {
          name: projectName,
          userId: currentUser.uid,
        });
        setTimeout(() => {
          setShowModal(false);
          setLoading(false);
        }, 2000);
        setprojectName("");
      } else {
        toast.info("The added project you have");
      }
    } else {
      toast.error("Login and enter the project name");
      setprojectName("");
    }
  };
  return (
    <div>
      <Plus
        size={20}
        className="cursor-pointer mr-1.5"
        onClick={() => setShowModal(true)}
      ></Plus>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading={"New project"}
          value={projectName}
          setShowModal={setShowModal}
          setValue={setprojectName}
          confirmText={"+ add project"}
          loading={loading}
        ></ProjectForm>
      </Modal>
    </div>
  );
};

export default AddNewProject;
