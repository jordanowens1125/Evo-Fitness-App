import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  // console.log(dispatch);
  const signIn = async (email, password) => {
    setIsLoading(true);
    setError(null);
    //const response = await createUser({ email, password })
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
      } else {
        //save user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      setError(error.message)  
    }
    setIsLoading(false)
  };
  return { signIn, isLoading, error };
};
