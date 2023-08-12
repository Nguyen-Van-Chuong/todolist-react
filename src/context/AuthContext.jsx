import React, { createContext, useMemo } from "react";
import { useUser } from "../hooks/AuthHook";

const AuthContext = createContext();
function AuthContextProvider({ children }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

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
  }, [signin, logout, signup]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
