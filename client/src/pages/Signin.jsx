import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Loading from "../Components/Shared/Loading";
import Error from "../Components/Shared/Error";
import Input from "../Components/Shared/Input";
import Buttons from "../Components/Shared/Buttons";

import "./Signin.scss";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, isLoading } = useLogin();
  const submit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };
  const demoLogin = async () => {
    try {
      await signIn(
        process.env.REACT_APP_DEMO_EMAIL,
        process.env.REACT_APP_DEMO_PASSWORD
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="form-section">
      <form onSubmit={submit} className="container">
        <Loading isLoading={isLoading} />

        <h1>Evo Fit Log In</h1>
        <p className="wait">
          *Please wait a few moments for the server to load up*
        </p>
        <Input
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          label={"Email"}
        />
        <Input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          label={"Password"}
        />
        <Buttons disabled={isLoading} primary={"Sign In"} fullWidth={true} />

        <div className="alt">
          <div className="new">
            <a href="/signup">Sign Up?</a>
          </div>

          <p onClick={demoLogin} className="primary">Test Account</p>
        </div>

        <Error error={error} />
      </form>
    </section>
  );
};

export default Signin;
