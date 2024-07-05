import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";

import { useGlobalContext } from "./useGlobalContext";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isPending, setIspending] = useState(false);
  const { dispatch } = useGlobalContext();

  // register with google
  const registerWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      setIspending(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Hello ${user.displayName}`);
      setIspending(false);
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
      setIspending(false);
    }
  };

  // register with normal

  const registerWithEmailAndPassword = async (
    email,
    password,
    photoURL,
    displayName
  ) => {
    try {
      setIspending(true);
      const register = createUserWithEmailAndPassword(auth, email, password);
      const user = (await register).user;
      await updateProfile(auth.currentUser, { photoURL, displayName });

      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome ${user.displayName}`);
      setIspending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.success(errorMessage);
      setIspending(false);
    }
  };

  return { registerWithGoogle, isPending, registerWithEmailAndPassword };
};
