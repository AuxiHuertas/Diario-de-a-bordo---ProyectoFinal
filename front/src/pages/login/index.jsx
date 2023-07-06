import { useForm } from "react-hook-form";

const template = {
  login: {
    email: {
      validation: {
        required: true,
      },
    },
    username: {
      validation: {
        required: true,
      },
    },
    password: {
      validation: {
        required: true,
        minLength: 4,
      },
    },
    errors: {
      required: "This field is mandatory",
      minLength: "4 length is required",
    },
  },
};

const Login = () => {
  const { register, formState, handleSubmit } = useForm();

  const handleForm = (data) => {
    console.info(">form data", data);
  };

  console.info("> form sate:", formState);

  const { errors } = template.login

  return (
    <section>
      <h1>Login Page</h1>
      <p>(Protected route) </p>
      <form onSubmit={handleSubmit(handleForm)}>
        <label htmlFor="email">emails</label>
        <br />
        <input
          id="email"
          placeholder="user@user.com"
          {...register("email", { required: true })}
        ></input>
        <p>{formState.errors && errors[formState.errors?.email?.type]}</p>

        <label htmlFor="username">username</label>
        <br />
        <input
          id="username"
          placeholder="user"
          {...register("username", { required: true })}
        ></input>
        <p>{formState.errors && errors[formState.errors?.username?.type]}</p>

        <label htmlFor="password">password</label>
        <br />
        <input
          id="password"
          type="password"
          placeholder="******"
          {...register("password", { required: true, minLength: 4 })}
        ></input>
        <p>{formState.errors && errors[formState.errors?.password?.type]}</p>

        <input type="submit" />
      </form>
    </section>
  );
};

export default Login;
