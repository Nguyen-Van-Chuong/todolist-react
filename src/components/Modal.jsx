import React, { Children, useRef } from "react";
import { useSpring, animated } from "react-spring";

const Modal = ({ children, showModal, setShowModal }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  // ANIMATION
  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    top: showModal ? "25%" : "100%",
    // transform: showModal ? "translateY(100%)" : "translateY(0%)",
    config: { friction: 10 },
  });

  return (
    showModal && (
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-gray-900 bg-opacity-50 z-10 "
        ref={modalRef}
        onClick={closeModal}
      >
        <animated.div style={modalAnimation}>
          <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/4 z-20">
            {children}
          </div>
        </animated.div>
      </div>
    )
  );
};

export default Modal;
