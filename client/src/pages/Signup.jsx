import Logo from "../assets/logo";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const submit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <>
      <section className="full-height full-width grow aic jcc flex body-color">
        <form onSubmit={submit} className="flex-column aic gap-lg">
          <Logo value={60} />
          <h3>Sign Up</h3>
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

          <button type="submit" className="primary" disabled={isLoading}>
            Sign Up
          </button>
          {error && <span>{error}</span>}
          <a href="/signin" className="flex-column">
            Already have an account?
          </a>
        </form>
      </section>
    </>
  );
};

export default Signup;
