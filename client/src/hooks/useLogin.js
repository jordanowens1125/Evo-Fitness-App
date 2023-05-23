import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log(email, password, `${process.env.REACT_APP_BASE_URL}`);
    //const response = await createUser({ email, password })
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.log(json);
      setError(json.message);
    } else {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { signIn, isLoading, error };
};
