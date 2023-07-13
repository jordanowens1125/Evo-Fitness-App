import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Loading from "../Components/Shared/Loading";
import Error from "../Components/Shared/Error";
import Input from "../Components/Shared/Input";

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
    <section className="full-height full-width grow aic jcc flex body-color">
      <div className="padding-xl  bg b-radius">
        <form onSubmit={submit} className="flex-column gap-lg aic">
          <Loading isLoading={isLoading} />
          <div className="flex-column gap-md aic text-align">
            <h2>Login To Your Account</h2>
            <span>
              <p>Don't Have An Account? </p>
              <a href="/signup" className="primary">
                <b className="primary">Sign Up</b>
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
          <b className="primary">
            *Please wait a few moments for the server a few moments to load up
          </b>
          <Error error={error} />
        </form>
      </div>
    </section>
  );
};

export default Signin;
