import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const [currentUser, setCurrentUser] = useState(
    useState(() => {
      // Try to get user from localStorage on initial load
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    })
  );
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
    });
    return () => unsubscribe();
  }, []);

  const signin = (email, password) => {
    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // const userq = userCredential;
          // setCurrentUser(userCredential.user);

          toast.success("Logged in successfully", {
            position: "top-right",
            autoClose: 3000, // Thời gian tự động đóng sau 3 giây
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signup = async (email, password, name, phone) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile and Firestore document
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        userName: name,
        email: user.email,
        phone: phone,
      });

      await updateProfile(user, {
        displayName: name,
        phoneNumber: phone,
      });

      setCurrentUser(user);

      // Show success toast
      toast.success("Sign Up Success", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return { currentUser, logout, signin, signup };
}
