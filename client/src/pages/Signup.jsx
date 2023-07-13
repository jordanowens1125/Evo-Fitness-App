import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import Input from "../Components/Shared/Input";
import Error from "../Components/Shared/Error";
import Loading from "../Components/Shared/Loading";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { signIn } = useLogin();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
    } catch (error) {}
  };

  const demoLogin = async () => {
    try {
      await signIn(
        process.env.REACT_APP_DEMO_EMAIL,
        process.env.REACT_APP_DEMO_PASSWORD
      );
    } catch (error) {}
  };

  return (
    <>
      <section className="full-height full-width grow aic jcc flex body-color">
        <div className="padding-xl  bg b-radius">
          <form onSubmit={submit} className="flex-column aic gap-lg">
            <Loading isLoading={isLoading} />

            <div className="flex-column gap-md aic text-align">
              <h1>Sign Up For Your Account</h1>
              <span>
                <p>Already have an account?</p>
                <a href="/signin" className="primary">
                  <b className="primary">Log In</b>
                </a>
              </span>
            </div>
            <Input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              label={"Email"}
              alignItems={true}
            />
            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              label={"Password"}
              alignItems={true}
            />

            {error && <span>{error}</span>}
            <button
              type="submit"
              className="primary-button full-width"
              disabled={isLoading}
              aria-label="Sign Up"
            >
              Sign Up
            </button>

            <button
              className="secondary-button full-width"
              onClick={demoLogin}
              type="button"
              aria-label="Log In As Demo User"
            >
              Log In As Demo User
            </button>
            <b className="primary">*Please wait a few moments for the server a few moments to load up</b>
            <Error error={error} />
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
