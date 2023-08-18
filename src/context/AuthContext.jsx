import React, { createContext, useMemo } from "react";
import { useUser } from "../hooks/AuthHook";

const AuthContext = createContext();
function AuthContextProvider({ children }) {
  // CONTEXT
  const { currentUser, logout, signin, signup } = useUser();
  //
  const contextValue = useMemo(() => {
    return {
      currentUser,
      signin,
      logout,
      signup,
    };
  }, [currentUser, signin, logout, signup]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
