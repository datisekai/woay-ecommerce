import { useMutation } from "@tanstack/react-query";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import AuthApi from "../services/AuthApi";
import { auth, googleProvider } from "../config/firebase";
import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const useLoginGoogle = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { mutateAsync } = useMutation(AuthApi.loginGoogle);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, googleProvider);
      const token = await response.user.getIdToken();
      const serverResponse = await mutateAsync(token);
      setCookie("token", serverResponse.token);
      signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignIn,
    loading,
  };
};

export default useLoginGoogle;
