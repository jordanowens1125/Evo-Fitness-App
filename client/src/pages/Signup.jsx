import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import Input from "../Components/Shared/Input";
import Error from "../Components/Shared/Error";
import Loading from "../Components/Shared/Loading";
import Buttons from "../Components/Shared/Buttons";
import "./Sign.scss";

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
      <section className="form-section">
        <form onSubmit={submit} className="container">
          <Loading isLoading={isLoading} />

          <h1>Evo Fit Sign Up</h1>
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
          <Buttons disabled={isLoading} primary={"Sign Up"} fullWidth={true} />

          <div className="alt">
            <div className="new">
              <a href="/signin">Login?</a>
            </div>

            <p onClick={demoLogin} className="primary">
              Test Account
            </p>
          </div>

          <Error error={error} />
        </form>
      </section>
    </>
  );
};

export default Signup;
