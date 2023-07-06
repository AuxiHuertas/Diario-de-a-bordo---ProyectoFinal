import {useForm} from 'react-hook-form'

const Login = () => {
    const {register, formState, handleSubmit} = useForm()

    const handleForm = (data) => {

        console.info(">form data", data);
    };

    return (
        <section>
            <h1>Login Page</h1>
            <p>(Protected route) </p>
            <form onSubmit={handleSubmit(handleForm)}>
                <label htmlFor="email">emails</label><br/>
                <input id="email" placeholder="user@user.com"{...register("email",{ required: true})}></input>
                <p></p>

                <label htmlFor="username">username</label><br/>
                <input id="username" placeholder="user" {...register("username",{ required: true})}></input>
                <p></p>
                <label htmlFor="password">password</label><br/>
                <input id="password" type="password" placeholder="******"{...register("password",{ required: true, minLength: 4})} ></input>
                <p></p>

                <input type="submit"/>
            </form>
        </section>
    );
};

export default Login