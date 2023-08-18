import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";

const User = () => {
  // USESTATE
  // CONTEXT
  const { currentUser, logout } = useContext(AuthContext);
  // Effect

  return (
    <>
      {currentUser ? (
        <div className="p-4 text-center border-b-2 ">
          <div className="flex flex-col ">
            <span className="text-lg font-semibold transition-all name">
              {currentUser.displayName}
            </span>
            <button onClick={() => logout()} className="text-gray-300">
              Log out
            </button>
          </div>
        </div>
      ) : (
        <LoginPage></LoginPage>
      )}
    </>
  );
};

export default User;
