import s from "./LoginForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { loginThunk } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/slice";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required!")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 chars!")
    .max(30, "Password must be less than 30 chars!"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(loginThunk(values));
    actions.resetForm();
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label htmlFor="email">
            <span>Email</span>
            <Field
              className={s.formInput}
              name="email"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="span" className={s.error} />
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <Field
              className={s.formInput}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
          </label>
          <button type="submit">Login</button>

          <div className={s.text}>
            You don't have account yet?
            <div className={s.linkWrapper}>
              <NavLink className={s.link} to="/register">
                Sign Up
              </NavLink>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
