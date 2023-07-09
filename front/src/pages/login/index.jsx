import { useForm } from "react-hook-form";
import * as templates from "../../misc/templates.js";
import { useLogin } from "../../hooks/useLogin.js";
import { useUser } from "../../hooks/useUser.js";
import { useEffect } from "react";
import { useLocation } from "wouter";



const Login = () => {
  const { register, formState, handleSubmit } = useForm();
  const doLogin = useLogin();
  const [,setLocation] = useLocation();
  const { data } = useUser()
 


  useEffect(() => {
    data && setLocation('/')
  }, [data]);

  const { errors, email, username, password } = templates.login;

  return (
    <section>
      <h1>Login Page</h1>
      <p>(Protected route) </p>
      <form onSubmit={handleSubmit(doLogin)}>
        <label htmlFor="email">emails</label>
        <br />
        <input
          {...{ ...email.props, ...register("email", email.validation) }}
        ></input>
        <p>{formState.errors && errors[formState.errors?.email?.type]}</p>

        <label htmlFor="username">username</label>
        <br />
        <input
          {...{
            ...username.props,
            ...register("username", username.validation),
          }}
        ></input>
        <p>{formState.errors && errors[formState.errors?.username?.type]}</p>

        <label htmlFor="password">password</label>
        <br />
        <input
          {...{
            ...password.props,
            ...register("password", password.validation),
          }}
        ></input>
        <p>{formState.errors && errors[formState.errors?.password?.type]}</p>

        <input type="submit" />
      </form>
    </section>
  );
};

export default Login;
