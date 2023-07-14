import React, { useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../store/api/AuthSlice";

const Login = () => {

  const [ login, { error = {} }] = useLoginMutation();
  const navigate = useNavigate();
  const [loginErrror, setLoginError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    login({
      email: values.email,
      password: values.password,
    }).unwrap().then(() => {
      navigate("/");
      window.location.reload();
    }
    );
  };

  useEffect(() => {
    if (error.status === 401) {
      setLoginError("Invalid email or password");
    }

    if (error.status === 500) {
      setLoginError("Something went wrong, please try again later");
    }
  }, [error]);

  
  return (
    <div className="p-12 rounded-lg shadow-lg shadow-gray-400 mt-[90px] md:w-3/4 mx-auto lg:w-1/2">
        <h4 className="mb-5 text-3xl text-yellow-400 font-bold">Login</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
          {loginErrror && <div className="text-red-500">{loginErrror}</div>}
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              type="password"
              name="password"
              placeholder="password"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
