import { useForm } from "react-hook-form";
import * as templates from "../../misc/templates.js";
import { useLogin } from "../../hooks/useLogin.js";
import { useQuery } from "react-query";
import { user } from "../../services";
import { useEffect } from "react";

const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: user.info,
  });

  return (data, isLoading)

}



const Login = () => {
  const { register, formState, handleSubmit } = useForm();
  const doLogin = useLogin();
  const { data } = useUser();



  useEffect(() => {
    console.info(">user info", data);
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
