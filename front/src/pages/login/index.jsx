



const Login = () => {
 

    return (
        <section>
            <h1>Login Page</h1>
            <p>(Protected route) </p>
            <form>
                <label htmlFor="email">email</label><br/>
                <input id="email" placeholder="user@user.com"></input>
                <p></p>

                <label htmlFor="username">email</label><br/>
                <input id="username" placeholder=" "></input>
                <p></p>

                <label htmlFor="password">email</label><br/>
                <input id="password" type="password" placeholder="******"></input>
                <p></p>

                <input type="submit"/>
            </form>
        </section>
    );
};

export default Login