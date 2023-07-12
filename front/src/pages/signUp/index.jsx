import { useForm } from "react-hook-form";
import { login } from "../../misc/templates";
import { useSignUp } from "../../hooks/useSignUp";
import { Link } from "wouter";
import { Carousel } from "react-bootstrap";

const SignUp = () => {
  const { register, formState, handleSubmit } = useForm();
  const doSigUp = useSignUp();

  const { errors, username, password, email } = login;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <section>
            <h1>Register</h1>

            <form onSubmit={handleSubmit(doSigUp)}>
              <label htmlFor="email">emails</label>
              <br />
              <input
                {...{ ...email.props, ...register("email", email.validation) }} className="form-control"
              ></input>
              <p>{formState.errors && errors[formState.errors?.email?.type]}</p>

              <label htmlFor="username">username</label>
              <br />
              <input
                {...{
                  ...username.props,
                  ...register("username", username.validation),
                }} className="form-control"
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
                }}  className="form-control"
              ></input>
              <p>
                {formState.errors && errors[formState.errors?.password?.type]}
              </p>
              <div class=" d-grid gap-2 col-6 mx-auto">
              <input lassName="btn btn-success" type="submit" />
              </div>
            </form>
            <br></br>
            <div class="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-light">
              <Link href="/login">Login</Link>
            </button>
            </div>
          </section>
        </div>
        <div className="col-md-9">
          <Carousel interval={1000}>
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
                src="https://cdn.pixabay.com/photo/2016/03/17/23/00/europe-1264062_1280.jpg"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2015/01/28/23/10/mosque-615415_1280.jpg"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://cdn.pixabay.com/photo/2016/01/19/15/48/luggage-1149289_640.jpg"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
