import { Formik, Field, Form, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { registrationValidation } from "../Validation/validationSchema";
import { mainServerAppUrl } from "../apis/mainApi";
import { toast } from "react-hot-toast";

function AddModal(props) {
  const handleSubmit = (data) => {
    props.onHide();
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
        toast.success("User added successfully", { id: "add", duration: 1500 });
        let userData = props.allData;
        userData.push(result.data);
        props.setAllData([...userData]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            handleSubmit(value);
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
                      (errors.last_name && touched.last_name
                        ? " is-invalid"
                        : "")
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
                  Add User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
