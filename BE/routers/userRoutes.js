const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.route("/register").post((req, res) => {
  controller.registerUser(req, res);
});

router.route("/login").post((req, res) => {
  controller.loginUser(req, res);
});

router.route("/delete/:user_id").delete((req, res) => {
  controller.deleteUser(req, res);
});

router.route("/edit/:user_id").patch((req, res) => {
  controller.editUser(req, res);
});

router.route("/all-user").get((req, res) => {
  controller.getAllUser(req, res);
});

module.exports = router;
