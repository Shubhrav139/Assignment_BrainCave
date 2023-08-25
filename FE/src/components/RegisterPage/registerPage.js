import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { registrationValidation } from "../Validation/validationSchema";
import { mainServerAppUrl } from "../apis/mainApi";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const register = (data) => {
    axios
      .post(mainServerAppUrl + "/register", {
        firstName: data?.first_name,
        lastName: data?.last_name,
        email: data?.email,
        password: data?.password,
        role: data?.role,
      })
      .then((result) => {
        // console.log(result.data);
        toast.success(
          "Registration successful. Kindly login with your credentials.",
          { id: "register", duration: 2000 }
        );
        setTimeout(() => {
          navigate("/");
        }, 2100);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="custom-form">
      <Formik
        enableReinitialize={true}
        validateOnMount={true}
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={registrationValidation}
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          role: "",
        }}
        onSubmit={(value) => {
          register(value);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row">
              <div className="col-12">
                <Field
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  className={
                    "form-control" +
                    (errors.first_name && touched.first_name
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="form_invalid"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Field
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  className={
                    "form-control" +
                    (errors.last_name && touched.last_name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="form_invalid"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="form_invalid"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Field
                  type="text"
                  name="password"
                  placeholder="Enter password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="form_invalid"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Field
                  as="select"
                  name="role"
                  className={
                    "form-control" +
                    (errors.role && touched.role ? " is-invalid" : "")
                  }
                >
                  <option value="">Select a role</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="form_invalid"
                />
              </div>
            </div>
            <div className="col-12 p-3">
              <button
                type="submit"
                value="SEARCH"
                className="btn btn-outline-primary"
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
