import { useForm } from "react-hook-form";
import * as templates from "../../misc/templates.js";
import { useLogin } from "../../hooks/useLogin.js";
import { useUser } from "../../hooks/useUser.js";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Carousel,Form } from "react-bootstrap";
import "./style.css";

const Login = () => {
  const { register, formState, handleSubmit } = useForm();
  const doLogin = useLogin();
  const [, setLocation] = useLocation();
  const { data } = useUser();

  console.log("¿esta aqui el id_user? >", data);
  console.log("estas viendo useForm()", useForm())

  useEffect(() => {
    data && setLocation("/");
  }, [data]);

  console.log("estas viendo data y setLocation>", data,setLocation)

  const { errors, email, username, password } = templates.login;

  return (
    <div className="contenedor">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <section>
              <h1>LogBook</h1>
              <h2>Access</h2>

              <form onSubmit={handleSubmit(doLogin)}>
                <label htmlFor="email">email</label>
                <br />
                <input
                  {...{
                    ...email.props,
                    ...register("email", email.validation),
                  }}
                  className="form-control"
                ></input>
                <p>
                  {formState.errors && errors[formState.errors?.email?.type]}
                </p>

                <label htmlFor="username">username</label>
                <br />
                <input
                  {...{
                    ...username.props,
                    ...register("username", username.validation),
                  }}
                  className="form-control"
                ></input>
                <p>
                  {formState.errors && errors[formState.errors?.username?.type]}
                </p>

                <label htmlFor="password">password</label>
                <br />
                <input
                  {...{
                    ...password.props,
                    ...register("password", password.validation),
                  }}
                  className="form-control"
                ></input>
                <p>
                  {formState.errors && errors[formState.errors?.password?.type]}
                </p>
                <Form.Text muted>
                Your password must have a minimum of 4 characters.
                </Form.Text>

                <div class=" d-grid gap-2 col-6 mx-auto">
                  <input className="btn btn-success" type="submit" />
                </div>
              </form>
              <br></br>
              <div class="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-light">
                  <Link href="/signup">Register</Link>
                </button>
              </div>
            </section>
          </div>
          <div className="col-md-9 carrDiv">
            <Carousel interval={800} fade="bool">
            <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2016/03/17/23/00/europe-1264062_1280.jpg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2018/05/17/16/03/compass-3408928_1280.jpg"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_1280.jpg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_640.jpg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727_1280.jpg"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
