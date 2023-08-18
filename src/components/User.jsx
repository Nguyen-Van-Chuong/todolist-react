import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";

const User = () => {
  // USESTATE
  const [displayName, setDisplayName] = useState(null);
  // CONTEXT
  const { currentUser, logout } = useContext(AuthContext);
  console.log("🚀 --> User --> currentUser:", currentUser);
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
