import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //const response = await createUser({ email, password })
    const response = await fetch("/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
        setError(json.message);
    } else {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};