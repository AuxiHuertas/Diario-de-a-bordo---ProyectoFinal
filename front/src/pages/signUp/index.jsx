import { useForm } from "react-hook-form"
import { login } from "../../misc/templates"
import { useSignUp } from "../../hooks/useSignUp";
import { Link } from "wouter";



const SignUp = () => {
    const {register, formState, handleSubmit } = useForm();
    const doSigUp = useSignUp();

    const { errors, username, password, email } = login;
 return (
    <section>
        <h1>Register</h1>
    
      <form onSubmit={handleSubmit(doSigUp)}>
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
        <button>
          <Link href="/login">
            Login
           </Link>
      </button>


    </section>
 );
};

export default SignUp;