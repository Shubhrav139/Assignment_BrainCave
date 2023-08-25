import React, { useEffect, useState } from "react";
import axios from "axios";
import { mainServerAppUrl } from "../apis/mainApi";
import AddModal from "../Modals/addModal";
import EditModal from "../Modals/editModal";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function UserListPage() {
  const [allData, setAllData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const permission = localStorage.getItem("permission");

  useEffect(() => {
    axios
      .get(mainServerAppUrl + "/all-user")
      .then((result) => {
        // console.log(result.data);
        setAllData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(mainServerAppUrl + `/delete/${userId}`)
      .then((result) => {
        // console.log(result.data);
        toast.success("User deleted successfully", {
          id: "delete",
          duration: 1500,
        });
        const ind = allData.findIndex((data) => data._id === userId);
        allData.splice(ind, 1);
        setAllData([...allData]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            {permission.includes("update") && <th scope="col">Edit</th>}
            {permission.includes("delete") && <th scope="col">Delete</th>}
          </tr>
        </thead>
        {allData.map((user, ind) => (
          <tbody key={ind}>
            <tr>
              <th scope="row">{ind + 1}</th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              {permission.includes("update") && (
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      setEditModal(true);
                      setEditUserData(user);
                    }}
                  >
                    <FiEdit3 />
                  </button>
                </td>
              )}
              {permission.includes("delete") && (
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        ))}
      </table>
      {permission.includes("create") && (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            setAddModal(true);
          }}
        >
          Add User
        </button>
      )}
      <AddModal
        allData={allData}
        setAllData={setAllData}
        show={addModal}
        onHide={() => setAddModal(false)}
      />
      <EditModal
        editUserData={editUserData}
        allData={allData}
        setAllData={setAllData}
        show={editModal}
        onHide={() => setEditModal(false)}
      />
    </>
  );
}
