import { Formik, Field, Form, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { mainServerAppUrl } from "../apis/mainApi";
import { toast } from "react-hot-toast";

function EditModal(props) {
  const handleSubmit = (data) => {
    props.onHide();
    axios
      .patch(mainServerAppUrl + `/edit/${props.editUserData._id}`, {
        firstName: data?.first_name,
        lastName: data?.last_name,
        email: data?.email,
      })
      .then((result) => {
        // console.log(result.data);
        // let allData = props.allData;
        // const ind = allData.findIndex(
        //   (data) => data._id === props.editUserData._id
        // );
        // allData.splice(ind, 1);
        // props.setAllData([...allData]);
        toast.success("User edited successfully", {
          id: "edit",
          duration: 1500,
        });
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
        <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          validateOnMount={true}
          validateOnChange={true}
          validateOnBlur={true}
          initialValues={{
            first_name: props.editUserData.firstName,
            last_name: props.editUserData.lastName,
            email: props.editUserData.email,
            role: props.editUserData.role,
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
                    name="role"
                    placeholder="Enter role"
                    disabled={true}
                    className={
                      "form-control" +
                      (errors.role && touched.role ? " is-invalid" : "")
                    }
                  />
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
                  Edit User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;
