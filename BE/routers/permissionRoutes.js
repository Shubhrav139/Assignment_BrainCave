const express = require("express");
const controller = require("../controllers/permissionController");
const router = express.Router();

router.route("/permission").post((req, res) => {
  controller.getPermission(req, res);
});

module.exports = router;
