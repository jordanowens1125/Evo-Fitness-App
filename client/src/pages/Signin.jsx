import Logo from "../assets/logo";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, isLoading } = useLogin();
  const submit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };
  const demoLogin = async () => {
    await signIn(
      process.env.REACT_APP_DEMO_EMAIL,
      process.env.REACT_APP_DEMO_PASSWORD
    );
  };
  return (
    <section className="full-height full-width grow aic jcc flex body-color">
      <div className="padding-xl  bg b-radius">
        <form onSubmit={submit} className="flex-column gap-lg aic">
          <Logo value={60} />
          <div className="flex-column gap-md aic text-align">
            <h2>Login To Your Account</h2>
            <span>
              <p>Don't Have An Account? </p>
              <a href="/signup" className="primary">
                <b className="primary">Sign Up</b>
              </a>
            </span>
          </div>
          <span className="full-width flex-column gap-md">
            <label htmlFor="Email:">Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="full-width"
              aria-label="Email"
            />
          </span>

          <span className="full-width flex-column gap-md">
            <label htmlFor="Password:">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              aria-label="Password"
            />
          </span>
          {error && <span>{error}</span>}
          <button
            className="primary-button full-width "
            disabled={isLoading}
            aria-label="Sign In"
          >
            Sign In
          </button>

          <button
            className="secondary-button full-width"
            onClick={demoLogin}
            type="button"
            aria-label="Log In As Demo User"
          >
            Log In As Demo User
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signin;
