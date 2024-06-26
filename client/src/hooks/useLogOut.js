import useAuthContext from "./useAuthContext";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const signOut = () => {
    //remove user from storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  window.addEventListener("beforeunload", () => {
    signOut()
  });
  return { signOut };
};
