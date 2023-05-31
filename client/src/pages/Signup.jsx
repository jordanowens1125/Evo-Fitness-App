import Logo from "../assets/logo";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const {signIn} = useLogin()
  const submit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  const demoLogin = async () => {
    await signIn(
      process.env.REACT_APP_DEMO_EMAIL,
      process.env.REACT_APP_DEMO_PASSWORD
    );
  };

  return (
    <>
      <section className="full-height full-width grow aic jcc flex body-color">
        <div className="padding-xl  bg b-radius">
          <form onSubmit={submit} className="flex-column aic gap-lg">
            <Logo value={60} />
            <div className="flex-column gap-md aic text-align">
              <h2>Sign Up For Your Account</h2>
              <span>
                <p>Already have an account?</p>
                <a href="/signin" className="primary">
                  <b className="primary">Log In</b>
                </a>
              </span>
            </div>
            <span className="full-width flex-column gap-md">
              <label htmlFor="Email:">Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </span>

            <span className="full-width flex-column gap-md">
              <label htmlFor="Password:">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </span>
            {error && <span>{error}</span>}
            <button
              type="submit"
              className="primary-button full-width"
              disabled={isLoading}
            >
              Sign Up
            </button>

            <button
              className="secondary-button full-width"
              onClick={demoLogin}
              type="button"
            >
              Log In As Demo User
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
