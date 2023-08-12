import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";

const User = () => {
  // CONTEXT
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <>
      {currentUser ? (
        <div className="p-4 text-center border-b-2 ">
          {/* <div className="w-12 h-12">
            <img
              src="https://source.unsplash.com/random"
              alt=""
              className="object-cover w-full h-full rounded-full"
            />
          </div> */}
          <div className="flex flex-col ">
            <span className="text-lg font-semibold name">
              {currentUser?.displayName}
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
