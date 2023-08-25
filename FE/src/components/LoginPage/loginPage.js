import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../Validation/validationSchema";
import { mainServerAppUrl } from "../apis/mainApi";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const login = (data) => {
    axios
      .post(mainServerAppUrl + "/login", {
        email: data?.email,
        password: data?.password,
      })
      .then((result) => {
        // console.log(result.data);
        localStorage.setItem("permission", result.data);
        toast.success("Log-in successful", { id: "login", duration: 1000 });
        setTimeout(() => {
          navigate("/user-list");
        }, 1100);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, { id: "add", duration: 1500 });
      });
  };

  return (
    <div className="custom-form">
      <Formik
        enableReinitialize={true}
        validateOnMount={true}
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={loginValidation}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(value) => {
          login(value);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row">
              <div className="col-12">
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter email address"
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
            <div className="col-12 p-3">
              <button
                type="submit"
                value="SEARCH"
                className="btn btn-outline-primary"
              >
                LOGIN
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p>
        Don't Have An Account Yet?
        <a
          onClick={() => navigate("/register")}
          style={{ color: "#0d6efd", cursor: "pointer" }}
        >
          Register Here!
        </a>{" "}
      </p>
    </div>
  );
}
