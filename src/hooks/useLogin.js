import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext;

  const signIn = async (email, password) => {
    try {
      setIsPending(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error("Email or Password is not Correct");
      setIsPending(false);
    }
  };

  return { isPending, signIn };
};
