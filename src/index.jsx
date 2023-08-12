import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { TodoContextProvider } from "./context";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TodoContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="/login" element={<LoginPage />}></Route>
            </Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </Routes>
        </TodoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
