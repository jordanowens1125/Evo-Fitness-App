import Logo from "../assets/logo";
import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

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
      <div className="padding-lg flex-column aic grow margin-lg secondary-bg gap-md">
        <form onSubmit={submit} className="flex-column aic gap-lg">
          <Logo value={60} />
          <h3>Login</h3>
          <label htmlFor="Email:">Email: </label>
          <input
            type="email"
            value={email}
            placeholder="Email: "
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <label htmlFor="Password:">Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Password: "
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className=" primary" disabled={isLoading}>
            Login
          </button>
          {error && <span>{error}</span>}
        </form>
        <button className="primary-button" onClick={demoLogin}>
          Login as demo user
        </button>
        <span className="flex-column aic"></span>
        <a href="/signup">Sign Up?</a>
      </div>
    </section>
  );
};

export default Signin;
