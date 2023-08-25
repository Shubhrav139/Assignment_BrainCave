const service = require("../services/userService");

function registerUser(req, res) {
  service
    .registerUser(req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

function loginUser(req, res) {
  service
    .loginUser(req.body)
    .then((result) => {
      res.status(200).send(result.permission);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

function deleteUser(req, res) {
  const userId = req.params.user_id;
  service
    .deleteUser(userId)
    .then(() => {
      res.status(200).send({ message: "deleted successfully" });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

function editUser(req, res) {
  const userId = req.params.user_id;
  service
    .editUser(userId, req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

function getAllUser(req, res) {
  service
    .getAllUser()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

module.exports = {
  registerUser,
  deleteUser,
  editUser,
  loginUser,
  getAllUser,
};
