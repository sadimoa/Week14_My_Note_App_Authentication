import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../store/api/AuthSlice";

const Register = () => {

  const [ register, { error = {} } ] = useRegisterMutation();
  const [ registerError, setRegisterError ] = useState(null);

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    register({
      name: values.name,
      email: values.email,
      password: values.password,
    }).unwrap().then(() => {
      navigate("/login");
    }
    );
  };

  useEffect(() => {
    if (error.status === 409) {
      setRegisterError("User already exists");
    }

    if (error.status === 500) {
      setRegisterError("Something went wrong, please try again later");
    }
  }, [error]);
  
  return (
    <div className="p-12 rounded-lg shadow-lg shadow-gray-400 mt-[80px] md:w-3/4 mx-auto lg:w-1/2">
        <h4 className="mb-5 text-3xl text-yellow-400 font-bold">Register</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>

          <div className="mb-5">
          {registerError && <div className="text-red-500">{registerError}</div>}
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
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
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
